public with sharing class getAccRecords 
{
    @AuraEnabled(cacheable = true) 
    public static List<Account> getAllAccounts()
        {
            List<Account> accList =[Select Id,Name,Phone FROM Account limit 10];
            return accList;
        }

}