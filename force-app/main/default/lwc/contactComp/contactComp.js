import { LightningElement,track,api,wire } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getAccRelatedContacts from '@salesforce/apex/getrelatedContacts.getAccRelatedContacts';

export default class ContactComp extends LightningElement {
    @wire (CurrentPageReference) pageRef;
    @track accountId;
    @track conList;
    @track boolVal = false;
    @track errorMsg = '';
    @track nullList = false;


    checkNULL()
    {
        if(arrayIsEmpty(this.conList))
        {
            this.nullList = true;

        }
        else
        {
            this.nullList = false;
        }
    }
    connectedCallback()
    {
        registerListener('pubsubevent',this.handleCallback,this);
    }


    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleCallback(detail){
        this.accountId = detail;
        this.boolVal = true;
    }


    @wire (getAccRelatedContacts,{accID: '$accountId'})
        wireConRecord({error,data}){
            if(data)
            {
                this.conList = data;
                this.errorMsg = undefined;
                this.checkNULL();
            }
            else
            {
                this.errorMsg = 'Error No Contact/No Account Selected';
                this.conList = undefined;
            }
        }
}