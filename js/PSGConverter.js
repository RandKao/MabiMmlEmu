/*!
 * PSGConverter.js
 * v1.4
 * Copyright (c)2007-2013 Logue <http://logue.be/> All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
//(function ($, window, document) {

	var insts = {
		'Lute':			{inst: 24,  max: 88, min: 16, mms: 0,  dls: 0},	// 25.  Acoustic Guitar (nylon)
		'Ukulele':		{inst: 28,  max: 88, min: 16, mms: 1,  dls: 1},	// 29.  Electric Guitar (muted)
		'Mandorin':		{inst: 105, max: 88, min: 16, mms: 2,  dls: 2},	// 106. Banjo
		'Whistle':		{inst: 72,  max: 88, min: 60, mms: 3,  dls: 3},	// 73.  Piccolo
		'Flute':		{inst: 73,  max: 83, min: 48, mms: 4,  dls: 5},	// 74.  Flute
		'Roncadora':	{inst: 77,  max: 83, min: 48, mms: 5,  dls: 4},	// 78.  Shakuhachi
		'Chalumeau':	{inst: 71,  max: 59, min: 24, mms: 6,  dls: 6},	// 72.  Clarinet
		'Tuba':			{inst: 58,  max: 59, min: 24, mms: 30, dls: 18},	// 59.  Tuba
		'Lyre':			{inst: 46,  max: 88, min: 16, mms: 0,  dls: 19},	// 47.  Orchestral Harp
		'E.Guitar':		{inst: 30,  max: 88, min: 16, mms: 0,  dls: 20},	// 31.  Electric Guitar (distortion)
		'Piano':		{inst: 0,   max: 88, min: 16, mms: 0,  dls: 21},	// 1.   Acoustic Grand Piano
		'Viollin':		{inst: 40,  max: 88, min: 16, mms: 0,  dls: 22},	// 41.  Viollin
		'Chello':		{inst: 40,  max: 88, min: 16, mms: 0,  dls: 23},	// 43.  Chello
		'Snare':		{inst: 48,  max: 38, min: 38, mms: 0,  dls: 65},	// 49.  Orchestra Kit (Concert SD)
		'Bass Drum':	{inst: 48,  max: 35, min: 35, mms: 19, dls: 66},	// 49.  Orchestra Kit (Gran Casa)
		'Drum':			{inst: 48,  max: 40, min: 40, mms: 20, dls: 67},	// 49.  Orchestra Kit (Concert SD)
		'Cymbal':		{inst: 48,  max: 57, min: 57, mms: 21, dls: 68},	// 49.  Orchestra Kit (Hand Cymbal)
		'Xylophone':	{inst: 15,  max: 88, min: 16, mms: 0,  dls: 77},	// 14.  Xylophone
	};
	
	var messages = {
		'en' : {
			'Rank'		: 'Rank',
			'Inst'		: 'Instrument',
			'Melody'	: 'Melody',
			'Chord1'	: 'Chord 1',
			'Chord2'	: 'Chord 2',
			
			'rewind'	: 'Rewind',
			'play'		: 'Play',
			'pause'		: 'Pause',
			'copy'		: 'Copy',
			'e_rewind'	: 'Rewind (Ensemble)',
			'e_play'	: 'Play (Ensemble)',
			'e_pause'	: 'Pause (Ensemble)',
			'export'	: 'Export',
			'msg_copied': 'Copied MML to clipboard.',
			
			'Lute'		: 'Lute',
			'Ukulele'	: 'Ukulele', 
			'Mandorin'	: 'Mandorin', 
			'Whistle'	: 'Whistle',
			'Flute'		: 'Flute',
			'Roncadora'	: 'Roncadora',
			'Chalumeau'	: 'Chalumeau',
			'Tuba'		: 'Tuba',
			'Lyre'		: 'Lyre',
			'E.Guitar'	: 'Electric Guitar',
			'Piano'		: 'Piano',
			'Viollin'	: 'Viollin',
			'Chello'	: 'Chello',
			'Snare'		: 'Snare',
			'Drum'		: 'Drum',
			'Bass Drum'	: 'Bass Drum',
			'Cymbal'	: 'Cymbal',
			'Xylophone'	: 'Xylophone'
		},
		ja : {
			'Rank'		: 'ランク',
			'Inst'		: '楽器',
			'Melody'	: 'メロディ',
			'Chord1'	: '和音１',
			'Chord2'	: '和音２',
			
			'rewind'	: '巻き戻し',
			'play'		: '再生',
			'pause'		: '一時停止',
			'copy'		: 'コピー',
			'e_rewind'	: '巻き戻し（合奏）',
			'e_play'	: '再生（合奏）',
			'e_pause'	: '一時停止（合奏）',
			'export'	: 'エクスポート',
			'msg_copied': 'クリップボードにコピーしました。',
			
			'Lute'		: 'リュート',
			'Ukulele'	: 'ウクレレ',
			'Mandorin'	: 'マンドリン',
			'Whistle'	: 'ホイッスル',
			'Flute'		: 'フルート',
			'Roncadora'	: 'ロンカドーラ',
			'Chalumeau'	: 'シャリュモー',
			'Tuba'		: 'チューバ',
			'Lyre'		: 'リラ',
			'E.Guiter'	: 'エレキギター',
			'Piano'		: 'ピアノ',
			'Viollin'	: 'バイオリン',
			'Chello'	: 'チェロ',
			'Snare'		: 'スネア',
			'Drum'		: '小太鼓',
			'Bass Drum'	: '大太鼓',
			'Cymbal'	: 'シンバル',
			'Xylophone'	: 'シロフォン'
		},
		ko : {
			'Rank'		: '순위',
			'Inst'		: '악기',
			'Melody'	: '멜로디',
			'Chord1'	: '화음 1',
			'Chord2'	: '화음 2',

			'rewind'	: '되감기',
			'play'		: '재생',
			'pause'		: '일시 정지',
			'copy'		: '복사',
			'e_rewind'	: '되감기 (합주)',
			'e_play'	: '재생 (합주)',
			'e_pause'	: '일시 정지 (합주)',
			'export'	: '내보내기',
			'msg_copied': '클립 보드에 복사되었습니다.',

			'Lute'		: '류트',
			'Ukulele'	: '우쿨렐레',
			'Mandorin'	: '만돌린',
			'Whistle'	: '휘슬',
			'Flute'		: '플루트',
			'Roncadora'	: '론카도라',
			'Chalumeau'	: '샬루모',
			'Tuba'		: '피시스 튜바',
			'Lyre'		: '리라',
			'Snare'		: '스네어 드럼',
			'Drum'		: '작은 북',
			'Bass Drum'	: '큰 북',
			'Cymbal'	: '심벌즈',
			'Xylophone'	: '실로폰',
			'E.Guiter'	: '일렉트릭 기타'
		},
		zh : {
			'Rank'		: '等级',
			'Inst'		: '仪器',
			'Melody'	: '旋律',
			'Chord1'	: '和弦 1',
			'Chord2'	: '和弦 2',
			
			'rewind'	: '回卷',
			'play'		: '播放',
			'pause'		: '暂停',
			'copy'		: '复制',
			'e_rewind'	: '回卷 (合奏)',
			'e_play'	: '播放 (合奏)',
			'e_pause'	: '暂停 (合奏)',
			'export'	: '输出',
			'msg_copied': '复制的MML到剪贴板。',
			
			'Lute'		: '鲁特琴',
			'Ukulele'	: '夏威夷四弦琴',
			'Mandorin'	: '曼陀林',
			'Whistle'	: '短笛',
			'Flute'		: '长笛',
			'Roncadora'	: '哆啦',
			'Chalumeau'	: '单簧管',
			'Tuba'		: '大號',
			'Lyre'		: '七弦琴',
			'Snare'		: '军鼓',
			'Drum'		: '小鼓',
			'Bass Drum'	: '低音鼓',
			'Cymbal'	: '钹',
			'Xylophone'	: '木琴',
			'E.Guiter'	: '电吉他'
		}
		
	};

	// MMLと音階テーブル
	var NOTE_TABLE = {'c':0,'d':2,'e':4,'f':5,'g':7,'a':9,'b':11};

	var GM_RESET = String.fromCharCode(
		0xF0, 0x05, 0x7E, 0x7F, 0x09, 0x01, 0xF7	// GM Reset F0 7E 7F 09 01 F7
	);

	// MIDIトラック　スタート
	var TRACK_START = String.fromCharCode(
		0x4d, 0x54, 0x72, 0x6b
	);
	// MIDIトラック　終わり
	var TRACK_END   = String.fromCharCode(
		0xFF, 0x2F
	);

	var MIME = 'audio/midi';
	var dLength = 96;			// 解像度
	var Semibreve = dLength*4;	// 1小節
	var Minim = dLength*2;		// １拍（Tick連動）

	// トラックごとの処理
	function genTrack(mml, chid, inst, pan, effect, Min, Max, track, trackName, isMelodyTrack){
		var isDrum = (Min == Max) ? true : false;
		var cLength = dLength;		// デフォルトの音長
		var cOctave = 4;			// デフォルトのオクターブ
		var cVolume = 8;			// デフォルトの音量
		var cNote = 0;				// "&"記号処理用
		var tieEnabled = false; 	// "&"記号処理用
		var time = Semibreve;		// 先頭を１小節あける。（ノイズがでるため）
		var isDrum = false;
/*
		if (Min == Max){
			chid = 9;
			isDrum = true;
		}
*/
		trackName = 'PSGConverter';
		var part_msgs = [];
		if (track == 0){
			part_msgs.push({'time' : 0,		'msg' : String.fromCharCode(0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08) })	// TimeSig 4/4 24 8
			part_msgs.push({'time' : 0,		'msg' : String.fromCharCode(0xff, 0x51, 0x03) + mml_getBytes(500000,3) })	// Tempo 120
			part_msgs.push({'time' : 0,		'msg' : String.fromCharCode(0xff, 0x54, 0x05, dLength, 0x00, 0x00, 0x00, 0x00) });	// SMPTE 96 0 0 0 0
			part_msgs.push({'time' : 0,	 	'msg' : GM_RESET });	// GMリセット
		}
		part_msgs.push({'time' : 0,		'msg' : String.fromCharCode(0xff, 0x03, trackName.length) +trackName });
		
		// QuickTimeはトラックごとに同じチャンネルでも別のチャンネルとして扱われるらしい。
		//if (isMelodyTrack){
			part_msgs.push({'time' : 96,	'msg' : String.fromCharCode(0xc0 + chid, inst)});	// PrCh 楽器変更
			part_msgs.push({'time' : 192,	'msg' : String.fromCharCode(0xb0 + chid, 10, pan)});		// パンポット
			part_msgs.push({'time' : 288,	'msg' : String.fromCharCode(0xb0 + chid, 91, effect)});	// エフェクト
		//}
		var notes = mml.match(/[A-GLNORTV<>][\+\#-]?[0-9]*\.?&?/ig);

		if (notes == null) return;

		for(var mnid=0; mnid < notes.length; mnid++) {
			// 音長(L)、オクターブ(O<>)、テンポ（T）、ボリューム（V）をパース
			if( notes[mnid].match(/([LOTV<>])([1-9][0-9]*|0?)(\.?)(&?)/i) ) {
				if(tieEnabled == 1 && RegExp.$4 != '&') {
					tieEnabled = 0;
					part_msgs.push({'time':time,'msg':String.fromCharCode(0x80+chid,cNote,Minim)});
				}
				switch(RegExp.$1){
					case 'L':
					case 'l':
						// 音長設定 Ln[.] (n=1～192)
						if(RegExp.$2 >= 1 && RegExp.$2 <= Minim) {
							cLength = Math.floor(Semibreve/RegExp.$2);
							if(RegExp.$3 == '.') {
								cLength = Math.floor(cLength*1.5);
							}
						}
						break;
					case 'O':
					case 'o':
						// オクターブ設定 On (n=1～8)
						if(RegExp.$2 >= 1 && RegExp.$2 <= 8) {
							cOctave = parseInt(RegExp.$2);
						}
						break;
					case 'T':
					case 't':
						// テンポ設定 Tn (n=32～255)
						if(RegExp.$2 >= 32 && RegExp.$2 <= 255) {
							part_msgs.push({'time':time, 'msg':String.fromCharCode(0xff,0x51,0x03)+mml_getBytes(Math.floor(60000000/RegExp.$2),3)});
						}
						break;
					case 'V':
					case 'v':
						//ボリューム調整
						if(RegExp.$2 != '' && RegExp.$2 >= 0 && RegExp.$2 <= 15) {
							cVolume = parseInt(RegExp.$2);
						}
						break;
					
					// 簡易オクターブ設定 {<>}
					case '<':
						cOctave = (cOctave<=1) ? 1: (cOctave-1);
						break;
					case '>':
						cOctave = (cOctave>=8) ? 8: (cOctave+1);
						break;
				}
			}
			// ノート命令（CDEFGAB）、絶対音階指定（N）をパース
			if( notes[mnid].match(/([A-GN])([\+\#-]?)([0-9]*)(\.?)(&?)/i) ) {
				var note = 0;
				var tick = cLength;
				var val = RegExp.$3;
				switch (RegExp.$1){
					case 'n': case 'N':
						// Nn, [A-G]数字なし -> Lで指定した長さに設定
						if((12<=val) && (val<=95)) note=val;
					break;
					default:
						// [A-G] 音名表記
						// 音符の長さ指定: n分音符→128分音符×tick数
						if(1<=val && val<=Minim) tick=Math.floor(Semibreve / val);	// L1 -> 384tick .. L64 -> 6tick
						if(RegExp.$4==".") tick=Math.floor(tick*1.5); // 付点つき -> 1.5倍

						if (!isDrum){
							// 音名→音階番号変換(C1 -> 12, C4 -> 48, ..)
							note = 12*cOctave + NOTE_TABLE[RegExp.$1.toLowerCase()];

							// 調音記号の処理
							switch(RegExp.$2){
								case '+':
								case '#':
									note++;
								break;
								case '-':
									note--;
								break;
							}
						}
					break;
				}

			//	if (!isDrum){
					// オクターブ調整（楽器の音域エミュレーション）
			//		while (note < Min) note = note+12;
			//		while (note > Max) note = note-12;
					note += 12; // 1オクターブ低く演奏される不具合を修正 060426
			//	}else{
			//		// ドラムパートの場合ノートを強制的に指定
			//		note = Max;
			//	}

				// c&dなど無効なタイの処理
				if(tieEnabled == true && note != cNote) {
					tieEnabled=false;
					part_msgs.push({'time':time,'msg':String.fromCharCode(0x80+chid,cNote,8*cVolume)});	// NoteOff
				}

				// 前回タイ記号が無いときのみノートオン
				if(tieEnabled == false) 
					part_msgs.push({'time':time,'msg':String.fromCharCode(0x90+chid,note,8*cVolume)});	// NoteOn

				time += tick;				// タイムカウンタを音符の長さだけ進める

				// ノートオフ命令の追加
				if(RegExp.$5=='&') {	// タイ記号の処理
					tieEnabled=true; 
					cNote=note; // 直前の音階を保存
				} else {
					tieEnabled=false;
					// 発音と消音が同じ時間の場合、そこのノートが再生されないため、消音時にtimeを-1する。
					part_msgs.push({'time':time-1,'msg':String.fromCharCode(0x80+chid,note,8*cVolume)});	// NoteOff
				}
			}else if(tieEnabled == true) {	// 無効なタイの処理
				tieEnabled = false;
				part_msgs.push({'time':time-1,'msg':String.fromCharCode(0x80+chid,cNote,8*cVolume)});	// NoteOff
			}
			
			// 休符設定 R[n][.] (n=1～64)
			if(notes[mnid].match(/[rR]([0-9]*)(\.?)/)) {
				tick=cLength; // 数字なし -> Lで指定した長さに設定
				var len = RegExp.$1;
				if(1<=len && len<=Minim) tick=Math.floor(Semibreve/len);	// L1 -> 128tick .. L64 -> 2tick
				if(RegExp.$2==".") tick=Math.floor(tick*1.5);	// 付点つき -> 1.5倍
				time += tick;									// タイムカウンタを休符の長さだけ進める
			}
		}
		part_msgs.push({time:time+Minim , 'msg' : String.fromCharCode(0xff , 0x2f, 0x00)});	// Meta TrkEnd
//		part_msgs.sort(function(a, b) {return a["time"] < b["time"] ? 1 : -1;});
		var track_data = '';
		var last_time;
		for(var mmid = 0; mmid < part_msgs.length; mmid++) {
			var dt = part_msgs[mmid].time - last_time;
			last_time = part_msgs[mmid].time;
			track_data += mml_writeVarLen(dt) + part_msgs[mmid].msg;
		}
		
		var ret = 
			TRACK_START +	// MTrk
			mml_getBytes(track_data.length,4) +	// Block Length
			track_data							// Midi data
		//	TRACK_END		// Trk End
		;
		return ret;
	}

	// MML>MIDI変換コアルーチン
	function mabimml_mml2midi(param, isDataUri) {
		var nMin = 16, nMax = 88;

		var track = 0;
		var ret ='';
/*
		// 直下にmmlパラメータが存在するかで、単一楽器用かどうかを判定する
		if (param.mml){
			if (param.min || param.max){
				nMin = param.min;
				nMax = param.max;
			}
			var inst = (param.inst && param.inst >= 0 && param.inst < 128) ? Math.round(param.inst) : 0;
			var pan = (param.pan && param.pan >= 0 && param.pan < 128) ? Math.round(param.pan) : 64;
			var effect = (param.effect && param.effect >= 0 && param.effect < 128) ? Math.round(param.effect) : 40;
			if (nMin == nMax){
				// ドラムの場合、メロディ→和音１→和音２という順にMMLが再生される。
				var d_mml = '';
				for(var part = 0; part < param.mml.length; part++) {	// パートごとに処理
					d_mml += param.mml[part];
				}
				ret += genTrack(d_mml, 9, inst, pan, effect, nMin, nMax, track, param.inst_name, true);
			}else{
				for(var part = 0; part < param.mml.length; part++) {	// パートごとに処理
					ret += genTrack(param.mml[part], 0, inst, pan, effect, nMin, nMax, track, param.inst_name, ((part==0)? true: false));
					track++;
				}
			}
		}else if (typeof(param) === 'object'){
*/
			// 合奏用
			for (var i = 0; i < param.length; i ++) {	// iの値はパート用番号として流用
				var p = param[i];
/*
				if (p.min || p.max){
					nMin = p.min;
					nMax = p.max;
				}
*/
				var inst = (p.inst && p.inst >= 0 && p.inst < 128) ? Math.round(p.inst) : 0;
				var pan = (p.pan && p.pan >= 0 && p.pan < 128) ? Math.round(p.pan) : 64;
				var effect = (p.effect && p.effect >= 0 && p.effect < 128) ? Math.round(p.effect) : 40;

	//			if (nMin == nMax){
				if (inst >= 65) {
					// ドラムの場合、メロディ→和音１という順にMMLが再生される。和音２は無視
					var d_mml = p.mml[0] + p.mml[1];
					ret += genTrack(d_mml, i, inst, pan, effect, nMin, nMax, track, p.inst_name , true);
					track++;
				}else{

					for(var part = 0; part < p.mml.length; part++) {
						ret += genTrack(p.mml[part], i, inst, pan, effect, nMin, nMax, track, p.inst_name,((part==0)? true: false));
						track++;
					}
				}
/*
			}
*/
		}
		// ヘッダーとともに内容を返す
		var midi =  
			String.fromCharCode(
				0x4D, 0x54, 0x68, 0x64,		// chunk ID "MThd"
				0x00, 0x00, 0x00, 0x06,		// chunk size
				0x00, 0x01,					// format type (Midi format1)
				0x00, track,				// number of tracks
				0x00, dLength				// ticks per beat
			) + ret;
		return (isDataUri) ? 'data:'+MIME+';base64,'+base64encode(midi) : midi;
	}
	
	//MMLを正規化
	function mml_sanitize(str) {
		var mml = str.replace(/\r\n|\n\r|\n|\r|\s|/g, '');	// Remove line break and space
		var ret = mml.match(/MML\@([0-9A-GLNORTV#<>.&+-]*)?,([0-9A-GLNORTV#<>.&+-]*)?,([0-9A-GLNORTV#<>.&+-]*)?;/i);
		if (ret !== null && typeof(ret) == 'object'){
			ret.shift();	// 一番先頭の配列は削除
			return ret;
		}else{
			return false;
		}
	}

	//// Utilities
	// int to bytes (length: len)
	var mml_getBytes = function(n, len){
		var buf = parseInt(n);
		var str = '';
		for(var i=0; i<len; i++) {
			str = String.fromCharCode(buf & 0xff) + str;
			buf >>>= 8;
		}
		return str;
	}
	// int to variable length string
	var mml_writeVarLen = function(value){
		var buf = parseInt(value);
		var str = String.fromCharCode(buf & 0x7f);
		buf >>>= 7;
		while(buf > 0) {
			str = String.fromCharCode(0x80 + (buf & 0x7f)) + str;
			buf >>>= 7;
		}
		return str;
	}

	// BASE64 (RFC2045) Encode/Decode for string in JavaScript
	// Version 1.2 Apr. 8 2004 written by MIZUTANI Tociyuki
	// Copyright 2003-2004 MIZUTANI Tociyuki
	// http://tociyuki.cool.ne.jp/archive/base64.html
	function base64encode(s){
		try{
			// Browser native function
			return btoa(s);
		}catch(e){
			var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var t = '', p = -6, a = 0, i = 0, v = 0, c;
			while ( (i < s.length) || (p > -6) ) {
				if ( p < 0 ) {
					if ( i < s.length ) {
						c = s.charCodeAt(i++);
						v += 8;
					} else {
						c = 0;
					}
					a = ((a&255)<<8)|(c&255);
					p += 8;
				}
				t += base64list.charAt( ( v > 0 )? (a>>p)&63 : 64 )
				p -= 6;
				v -= 6;
			}
			return t;
		}
	}
//});
