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


