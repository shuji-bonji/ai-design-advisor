#!/usr/bin/env node
// スキル出力の「次元別」表を canonical と突合する。
//
//   node scripts/check-output.mjs <file.md ...>
//   node scripts/check-output.mjs --strict <file.md ...>   警告も失敗にする
//   node scripts/check-output.mjs --list                   ID 一覧を出す
//
// 終了コード
//   0  エラーなし
//   1  エラーあり（存在しない根拠 ID / 語彙外の確度 / 根拠のない「確定」）
//   2  判定不能（canonical を読めなかった）。「一致」に混ぜないため 1 と分ける

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const CANONICAL = 'knowledge/canonical';
const CONFIDENCE = ['確定', '条件付き', '情報不足'];

function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) out.push(...walk(p));
		else if (name.endsWith('.md')) out.push(p);
	}
	return out;
}

function loadIds(root) {
	let files;
	try {
		files = walk(root);
	} catch {
		return null; // 読めなかった → 判定不能
	}
	const ids = new Map();
	for (const f of files) {
		const m = readFileSync(f, 'utf8').match(/^- id: (\S+)\s*$/m);
		if (m) ids.set(m[1], relative(root, f));
	}
	return ids.size ? ids : null;
}

function parseRows(text) {
	const lines = text.split('\n');
	const rows = [];
	let tail = '';
	let inTable = false;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const m = line.match(/^\|\s*([DX]\d*)\s*\|/);
		if (m) {
			const cells = line.split('|').map((c) => c.trim());
			// | 次元 | 推奨 | 根拠 | 確度 |
			rows.push({ dim: m[1], advice: cells[2] ?? '', basis: cells[3] ?? '', confidence: cells[4] ?? '', line: i + 1 });
			inTable = true;
			continue;
		}
		if (inTable && !line.startsWith('|')) {
			if (/^#{1,6}\s/.test(line)) inTable = false;
			else tail += line + '\n';
		}
	}
	return { rows, tail };
}

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const list = args.includes('--list');
const targets = args.filter((a) => !a.startsWith('--'));

const ids = loadIds(CANONICAL);
if (!ids) {
	console.error(`判定不能: ${CANONICAL} から ID を読めませんでした。作業ディレクトリはリポジトリのルートです。`);
	process.exit(2);
}

if (list) {
	for (const [id, path] of [...ids].sort()) console.log(`${id}\t${path}`);
	if (!targets.length) process.exit(0);
}

if (!targets.length) {
	console.error('使い方: node scripts/check-output.mjs [--strict] <file.md ...>');
	process.exit(2);
}

let errors = 0;
let warnings = 0;

for (const file of targets) {
	let text;
	try {
		text = readFileSync(file, 'utf8');
	} catch {
		console.error(`判定不能: ${file} を読めませんでした`);
		process.exit(2);
	}
	const { rows, tail } = parseRows(text);
	if (!rows.length) {
		console.log(`- ${file}: 次元別の表がありません（一枚・メモは対象外）`);
		continue;
	}
	for (const r of rows) {
		const where = `${file}:${r.line} ${r.dim}`;

		if (!CONFIDENCE.includes(r.confidence)) {
			console.error(`ERROR ${where} 確度が語彙外です: "${r.confidence}"（${CONFIDENCE.join(' / ')}）`);
			errors++;
		}

		const basis = r.basis
			.split('/')
			.map((s) => s.trim())
			.filter((s) => s && s !== '—' && s !== '-');

		for (const b of basis) {
			if (!ids.has(b)) {
				console.error(`ERROR ${where} 根拠 ID が canonical にありません: ${b}`);
				errors++;
			}
		}

		if (r.confidence === '確定' && basis.length === 0) {
			console.error(`ERROR ${where} 確度が「確定」なのに根拠がありません`);
			errors++;
		}

		if ((r.confidence === '条件付き' || r.confidence === '情報不足') && !tail.includes(r.dim)) {
			console.warn(`WARN  ${where} 確度が「${r.confidence}」ですが、表の直後に理由が書かれていません`);
			warnings++;
		}
	}
}

console.log(`\n対象 ${targets.length} 件 / エラー ${errors} / 警告 ${warnings}`);
if (errors > 0 || (strict && warnings > 0)) process.exit(1);
process.exit(0);
