show tree of files and folders in currect folder
```groovy
def result = ''
file = new File('.')
file.eachFile {
    result = result + it + '\n'
    println it
}
return result
```

show recursive files and folders in correct folder
```groovy
def result = ''
file = new File('.')
file.eachFileRecurse {
    result = result + it + '\n'
    println it
}
return result
```

show recursive files and folders in correct folder
```groovy
def result = ''
new File('../../../../../../home/hybris/.bashrc').eachLine {
    result = result + it + '\n'
    println it
}
return result
```
change hac config on all nodes
```groovy
import com.amway.lynxcore.util.cluster.property.LynxPropertyChangeEvent
def key="feature.marketplaces.enabled"
def value="true"
eventService.publishEvent(new LynxPropertyChangeEvent(key,value))
println key + ' = ' + value
return "property changed! \n" + key + ' = ' + value
```
run business process
```groovy
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery
 
def orderCode = [3903105109]
def query = "SELECT {pk} FROM {BusinessProcess} WHERE {code} LIKE '%" + orderCode + "%'"
def flexQuery = new FlexibleSearchQuery(query)
    flexibleSearchService.search(flexQuery).result.each { businessProcess -> 
        businessProcessService.restartProcess(businessProcess,'invoiceOrder')
        println "Business process for " + orderCode + " restored"
    }
```