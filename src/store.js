import {action, computed, observable,toJS} from 'mobx';
import _ from "lodash"


export default class State {
  @observable windowSize={
    width:window.innerWidth,
    feight:window.innerHeight
  }
  @action.bound
  updateWindowSize(w,h){
    this.windowSize.width=w;
    this.windowSize.height=h;
  }
  @observable groupes=[
    {rate:0.7,num:1,bill:0},{rate:0.3,num:1,bill:0}
  ];  
  @action.bound  
  updateGroupeNum(num,n){
    this.groupes[num].num = n;
  } 
  @action.bound  
  updateGroupeRate(num,rate){
    this.groupes[num].rate = rate;
  }   
  @action.bound
  addGroupe(){    
    const groupeNum = this.groupes.length;
    const lastGroupe = this.groupes[groupeNum - 1];
    this.groupes[groupeNum - 1].rate = lastGroupe.rate / 2;    
    this.groupes.push({ rate: lastGroupe.rate, num: 1, bill: 0 });    
  }
  @observable rateBox=document.createElement("div");
  @action.bound
  updateRateBox(element){
    this.rateBox=element;
  }  
  @observable totalAmount=0;
  @action.bound 
  updateTotalAmount(val){
    this.totalAmount=val;
  }
  @observable change=0;
  @action.bound
  updateChange(val){
    this.change=val;
  }
  @action.bound
  removeGroupe(num){    
    if(this.groupes.length>1){
      if(num===0){
        this.groupes[num+1].rate+=this.groupes[num].rate;
      }else{
        this.groupes[num-1].rate+=this.groupes[num].rate;
      }
      this.groupes=this.groupes.filter((e,i)=>i!==num);
    }
  }
  @action.bound 
  calculate(){    
    const nums=this.groupes.map(e=>e.num);    
    const rates=this.groupes.map(e=>e.rate);     
    const sum=this.totalAmount;            
    const over=nums.reduce((prev,curr,i)=>prev+curr*rates[i],0);
    const sta=sum/over;        
    const ind=rates.map(e=>e*sta);        
    const frac=ind.map(e=>{      
      const array=[];
      array[0]=-e%100;
      array[1]=100+array[0];
      return array;      
    });              
    const ress=nums.reduce((prev,curr,i)=>{
      const array=[];      
      prev.forEach(e=>{        
        frac[i].forEach(f=>{                    
          const frac=_.cloneDeep(e.frac);          
          frac.push(f);
          array.push(
            {
              res:e.res+curr*f,              
              frac:frac
            }
            );
        })
      })
      return array;      
    },[{res:0,frac:[]}]);            
    const ressLargerThanZero=ress.filter(e=>e.res>=0);        
    const min=ressLargerThanZero.reduce((prev,curr)=>{      
      return prev.res>curr.res?curr:prev;
    },ressLargerThanZero[0]);    
    let totalAmount=0;
    this.groupes.forEach((e,i)=>{      
      e.bill= min.frac[i]+ind[i];
      totalAmount+=e.bill*e.num;
    })    
    this.updateChange(totalAmount-this.totalAmount);
  }  
}
