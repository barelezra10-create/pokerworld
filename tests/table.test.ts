import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deal,act,limits} from '../lib/table.ts';
test('limp leaves big blind option, then flop starts out of position',()=>{let s=deal();s=act(s,'call');assert.equal(s.street,0);assert.equal(s.turn,1);s=act(s,'check');assert.equal(s.street,1);assert.equal(s.turn,1);assert.equal(s.board.length,3)});
test('fold transfers pot and next hand alternates button',()=>{const s=act(deal(),'fold');assert.equal(s.stacks[0]+s.stacks[1],2000);assert.equal(deal(s).button,1)});
test('rejects checking into a bet and undersized raises',()=>{assert.throws(()=>act(deal(),'check'));assert.throws(()=>act(deal(),'raise',15))});
test('all in and call run out the board and conserve chips',()=>{let s=deal();s=act(s,'raise',1000);s=act(s,'call');assert(s.done);assert.equal(s.board.length,5);assert.equal(s.stacks[0]+s.stacks[1],2000)});
test('short blind all-in returns unmatched chips',()=>{let s=deal();s=act(s,'fold');s.stacks=[3,1997];s.button=1;s=deal(s);s=act(s,'call');assert(s.done);assert.equal(s.stacks[0]+s.stacks[1],2000)});
test('random legal play conserves stacks, terminates and never duplicates cards',()=>{for(let n=0;n<300;n++){let s=deal();let actions=0;while(!s.done){const l=limits(s),r=Math.random();s=l.canRaise&&r<.2?act(s,'raise',Math.min(l.max,l.min)):act(s,l.call?'call':'check');assert(s.stacks.every(x=>x>=0));assert(++actions<200);assert.equal(s.stacks[0]+s.stacks[1]+(s.done?0:s.pot),2000);}const cards=[...s.hands.flat(),...s.board,...s.shoe];assert.equal(new Set(cards).size,52)}});
