public with sharing class getrelatedContacts 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccRelatedContacts(String accID) 
    {
      List<Contact> contactList = [Select id, Name, FirstName, LastName, Phone, email From Contact Where AccountId=:accID limit 20];
      return contactList;

    }
}