import { LightningElement,track, api, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/getAccRecords.getAllAccounts';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class AccountComp extends LightningElement 
{
    @wire (CurrentPageReference) pageRef;
    @api accList;
    @api boolVal = false;
    @api accId;
    @api errors;
    @api recordId;
    @api eventParam;

    handleRadio(event)
    {
        this.accId = event.target.value;
        // this.eventParam = {'accId' : this.accId};
        fireEvent(this.pageRef,'pubsubevent',this.accId);
    }
    
    @wire(getAllAccounts,{
    }
   )
   wiredCases({
       data,error
   }){
   if(data){
       this.accList = data;
       this.errors = undefined;
   }
   if(error){
       this.errors = error;
       this.accList = undefined;
       }
   }
}
    

