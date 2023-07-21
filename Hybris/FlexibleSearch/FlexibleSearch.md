#Flexible search tweaks 

| Wildcard characters | Description                                                   |
| :-----------------: | ------------------------------------------------------------- |
|         `%`         | Any string with zero or more characters in the search pattern |
|         `_`         | Any single character search with the specified pattern        |
|        `[]`         | Any single character search within the specified range        |
|        `[^]`        | Any single character search not within the specified range    |

##Examples

Here we find all Customers witch names start 'An' characters:
```sql
SELECT {c.name} FROM {Customer as c} 
WHERE {c.name} LIKE 'An%'
```

if  you have  result expect step 4, go to backoffice and find cronjob with not correct result.
Then try to change status to FINISHED and save it. Wait some time before start this cronJob(if cronjob running ones a day, run mannualy and check status after ended)

if first step not help. go to time shedule and recreate cronjob start расписание. 

Important! don`t forget take copy settings before delete and after this click save.