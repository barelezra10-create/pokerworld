export const ranks='23456789TJQKA';
export const suits='shdc';
export const deck=Array.from({length:52},(_,i)=>ranks[i%13]+suits[Math.floor(i/13)]);
export function parseCards(text:string){const cards=text.trim()?text.trim().split(/[ ,]+/).map(x=>x[0]?.toUpperCase()+x.slice(1).toLowerCase()):[];if(cards.some(c=>!deck.includes(c)))throw Error('Use cards like As Kh, with s, h, d or c for the suit.');return cards;}
export function rankHand(cards:string[]){
 const vals=cards.map(c=>ranks.indexOf(c[0])+2), counts=new Map<number,number>();vals.forEach(v=>counts.set(v,(counts.get(v)||0)+1));
 const straight=(v:number[])=>{const a=[...new Set(v)].sort((a,b)=>b-a);if(a.includes(14))a.push(1);for(let i=0;i<=a.length-5;i++)if(a[i]-a[i+4]===4)return a[i];return 0;};
 const flush=suits.split('').map(s=>cards.filter(c=>c[1]===s).map(c=>ranks.indexOf(c[0])+2).sort((a,b)=>b-a)).find(v=>v.length>=5);
 const groups=[...counts].sort((a,b)=>b[1]-a[1]||b[0]-a[0]);let score:number[];
 if(flush&&straight(flush))score=[8,straight(flush)];
 else if(groups[0][1]===4)score=[7,groups[0][0],...vals.filter(v=>v!==groups[0][0]).sort((a,b)=>b-a).slice(0,1)];
 else if(groups[0][1]===3&&groups[1]?.[1]>=2)score=[6,groups[0][0],groups[1][0]];
 else if(flush)score=[5,...flush.slice(0,5)];
 else if(straight(vals))score=[4,straight(vals)];
 else if(groups[0][1]===3)score=[3,groups[0][0],...groups.slice(1).map(g=>g[0]).sort((a,b)=>b-a).slice(0,2)];
 else if(groups[0][1]===2&&groups[1]?.[1]===2){const pairs=groups.filter(g=>g[1]===2).map(g=>g[0]).sort((a,b)=>b-a);score=[2,...pairs.slice(0,2),Math.max(...vals.filter(v=>!pairs.slice(0,2).includes(v)))];}
 else if(groups[0][1]===2)score=[1,groups[0][0],...groups.slice(1).map(g=>g[0]).sort((a,b)=>b-a).slice(0,3)];
 else score=[0,...vals.sort((a,b)=>b-a).slice(0,5)];
 return Array.from({length:6},(_,i)=>score[i]||0).reduce((v,n)=>v*15+n,0);
}
export function simulate(heroText:string,villainText:string,boardText:string,trials=10000){const hero=parseCards(heroText),villain=parseCards(villainText),board=parseCards(boardText);if(hero.length!==2||villain.length!==2)throw Error('Enter exactly two cards for each player.');if(![0,3,4,5].includes(board.length))throw Error('The board must have 0, 3, 4 or 5 cards.');const used=[...hero,...villain,...board];if(new Set(used).size!==used.length)throw Error('A card can only appear once.');const available=deck.filter(c=>!used.includes(c));let wins=0,ties=0,n=board.length===5?1:trials;for(let i=0;i<n;i++){const pool=[...available],run=[...board];while(run.length<5){const k=Math.floor(Math.random()*pool.length);run.push(pool[k]);pool[k]=pool[pool.length-1];pool.pop();}const a=rankHand([...hero,...run]),b=rankHand([...villain,...run]);if(a>b)wins++;else if(a===b)ties++;}return {equity:(wins+ties/2)/n*100,win:wins/n*100,tie:ties/n*100,trials:n};}
