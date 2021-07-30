# Odata webservice Guide
[Open Data (OData) Protocol](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=odata) is an OASIS standard that defines best practices for building and consuming RESTful APIs. It is based on HTTP protocol and provides metadata for the entities it exposes and their relationships. In some ways, it is similar to SQL for a relational database system (RDBMS) as it provides querying options such as filtering, ordering results, support for pagination, number of records and more. It supports both XML (Atom) and JSON formats for querying and modifying data.

For more information on OData please refer to http://www.odata.org where you can find detailed documentation and tutorials. 

## Table of Contents
<!-- MarkdownTOC -->
- [Odata webservice Guide](#odata-webservice-guide)
    - [Table of Contents](#table-of-contents)
    - [Extensions info](#extensions-info)
    - [Installation](#installation)
        - [1. Extension](#1-extension)
        - [2. Initialize](#2-initialize)
    - [Supported HTTP operations](#supported-http-operations)
        - [OData HTTP operations](#odata-http-operations)
        - [SAP Cloud for Customer Annotations](#sap-cloud-for-customer-annotations)
        - [System Query Options](#system-query-options)
        - [Supported Formats](#supported-formats)
    - [Odata project extension](#odata-project-extension)
        - [Impex example](#impex-example)
        - [Local properties](#local-properties)
        - [Integration Admin role](#integration-admin-role)
        - [Postman settings](#postman-settings)
        - [Valid responses](#valid-responses)
    - [HELP URL`S](#help-urls)
        - [Help SAP](#help-sap)
        - [OASIS](#oasis)
        - [GitHub](#github)
    
## Extensions info
| extension                          | Description                                                                                                                                                                                                                                                                                                                                                             |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**odata2webservices**               | The odata2webservices extension exposes the business service as a REST-based web service. The extension is dependent on odata2services, which is dependent on integrationservices, which depends on integrationservices. When you install odata2webservices, the odata2services and integrationservices extensions are automatically available at compile and runtime.  |
|**integrationservices**             | This SAP Commerce extension facilitates the creation of the Integration Object within the SAP Commerce database. The integrationservices extension can be included on its own. You can only use ImpEx to import the Integration Objects and attributes. You cannot generate the EDMX schema.                                                                            |
|**odata2services**                  | This SAP Commerce extension persists inbound posts, facilitates outbound posts, and encapsulates the services used to generate an EDMX schema from an Integration Object item. The EDMX schema can be used with SAP Cloud Platform Integration, for example.                                                                                                            |
|**integrationbackoffice**           | This extension allows you to create and edit Integration Objects at runtime.                                                                                                                                                                                                                                                                                            |
|**inboundservices**                 | This extension provides monitoring capabilities for inbound data requests. This extension depends on the integrationservices extension.                                                                                                                                                                                                                                 |
|**outboundservices**                | The outboundservices extension provides services and monitoring capabilities for data flows from the ECP to external systems. The extension depends on the integrationservices extension.                                                                                                                                                                               |
|**outboundsync**                    | This extension allows the publication of new and modified Integration Objects to external systems. The outboundsync extension relies on the deltadetect extension.                                                                                                                                                                                                      |
|**integrationmonitoringbackoffice** | This extension enables monitoring of incoming and outgoing requests.                                                                                                                                                                                                                                                                                                    |
|**outboundsyncbackoffice**          | Use this extension to view and create outbound sync configurations.                                                                                                                                                                                                                                                                                                     |

## Installation
### 1. Extension

Minimum what you need add to your project extensions into your local.properties:

```xml  
    <extension name="integrationservices"/>
    <extension name="integrationbackoffice"/>
    <extension name="odata2services"/>
    <extension name="odata2webservices"/>
```

### 2. Initialize

Run in command line `ant clean all` and  `ant initialize` you can try to open next url:

https://localhost:9002/odata2webservices/IntegrationService

## Supported HTTP operations

### OData HTTP operations

|Operation       | Description                                                                                                                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**GET**         | Used to retrieve a single entity instance or multiple entity instances                                                                                                                                                            |
|**POST**        | Used to create entity instances                                                                                                                                                                                                   |
|**PUT**         | Used to **completely** replace/overwrite and existing entity instance                                                                                                                                                             |
|**PATCH**       | Used to replace/overwrite existing entity instance. The key difference between PUT and PATCH is that PUT overwrites the complete entity whereas PATCH only updates **only** attributes of the entity that are part of the payload |
|**DELETE**      | Used to delete an entity record                                                                                                                                                                                                   |
|**$batch**      | Used to perform multiple query, create, update and delete operations with explicit transaction boundaries specified via Changesets as a part of the payload                                                                       |
|**Deep Insert** | Used with **POST**. Allows the creation of complete entity (header entry, child entries etc) with a single POST request                                                                                                           |

### SAP Cloud for Customer Annotations

Following table describes the OData Framework behavior as of the November, 2018 release (1811).

| Annotation                | Definition                                           | Framework Behaviour                                                                                       |
|---------------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
|**sap:creatable = true**   | Property is relevant while creating a new record     | OData Framework passes the value in the payload to the Business Object.                                   |
|**sap:creatable = false**  | Property is NOT relevant for creating a new record   | OData Framework raises an error if it receives a value for the property.                                  |
|**sap:updatable = true**   | Property is relevant while updating a record         | OData Framework passes the value in the payload to the Business Object.                                   |
|**sap:updatable = false**  | Property is NOT relevant while updating a record     | OData framework raises an error if the value is different from the one that exists in the Business Object.|
|**sap:filterable = true**  | The property can be used in $filter query parameter  | OData Framework passes the filter value to the Business Object.                                           |
|**sap:filterable = false** | filterable = false                                   | If $filter is used on that property OData framework raises an error                                       |
|**c4c:context-property**   | The annotation provides the context for the property | E.g. Country is the context for the property RegionCode (i.e. State).                                     |

### System Query Options

As stated above, SAP Cloud for Customer supports version 2 of the OData protocol. Here we list the set of system query options that are supported by the C4C OData implementation.

|Query Option     | Example                                                | Description                                                                                                                              |
|-----------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
|**$batch**       | /$batch                                                | Perform several OData query, create, update or delete operations with a single HTTP POST call.                                           |
|**$count**       | /OpportunityCollection/$count                          | Returns the total number of Opportunities                                                                                                |
|**$format**      | /OpportunityCollection?$format=json                    | Returns Opportunity entries in JSON format with server side paging                                                                       |
|**$inlinecount** | /OpportunityCollection?$top=10&$inlinecount=allpages   | Returns the top 10 opportunities and also returns the total number of opportunities.                                                     |
|**$orderby**     | /OpportunityCollection?$orderby=CloseDate desc&$top=10 | First performs an orderby on the Opportunities and then selects the top 10 from that ordered list. Here **desc** means descending order. |
|**$search**      | /CustomerCollection?$search='Porter'                   | Returns Customer entries with at least one of the search enabled fields contain the word 'Porter'                                        |
|**$select**      | /OpportunityCollection?$select=OpportunityID,AccountID | Returns Opportunity entries but only 2 attributes OpportunityID and AccountID                                                            |
|**$skip**        | /OpportunityCollection?$skip=10                        | Skips the first 10 entries and then returns the rest                                                                                     |
|**$top**         | /OpportunityCollection?$top=10                         | Returns top 2 Opportunities. 'Top 2' is defined by server logic here                                                                     |
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
### Supported Formats                                                                                                                                                                                                         
                                                                                                                                                                                                                              
SAP Cloud for Customer OData API supports HTTP request and response payloads in both Atom (XML) and JSON formats. The default payload format is Atom (XML). In order to use JSON format please follow the instructions below: 

- For HTTP GET requests, use the system query parameter `$format=json`.

Example:

```http request
https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels?$format=json
```

will return

```JSON
{
"d":{
    "EntitySets":["ODataServiceCollection"]
    }
}
```

- For HTTP POST/PATCH/PUT requests with JSON payload, set the HTTP `Content-Type` header as below:

```http
Content-Type: application/json
```

## Odata project extension 
### Impex example

Example of impex for get product stock level:

```impex
INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)
                               ; GetStockLevel      ; INBOUND

INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code) ; root[default = false]
                                   ; GetStockLevel                         ; StockLevel         ; StockLevel ; true ;

INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code); unique[default = false]; autoCreate[default = false]
                                            ; GetStockLevel:StockLevel                                           ; available                   ; StockLevel:available                               ;                                                           ;                        ;
                                            ; GetStockLevel:StockLevel                                           ; productCode                 ; StockLevel:productCode                             ;                                                           ; true                   ;  
```

Now you can get stock level of all products by url:

https://kvb.local:9002/odata2webservices/GetStockLevel/StockLevels

will return :

```xml
<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xml:base="https://kvb.local:9002/odata2webservices/GetStockLevel/">
    <id>https://kvb.local:9002/odata2webservices/GetStockLevel/StockLevels</id>
    <title type="text">StockLevels</title>
    <updated>2020-02-17T18:09:32.404+02:00</updated>
    <author>
        <name/>
    </author>
    <link href="StockLevels" rel="self" title="StockLevels"/>
    <entry>
        <id>https://kvb.local:9002/odata2webservices/GetStockLevel/StockLevels('97666')</id>
        <title type="text">StockLevels</title>
        <updated>2020-02-17T18:09:32.404+02:00</updated>
        <category term="HybrisCommerceOData.StockLevel" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme"/>
        <link href="StockLevels('97666')" rel="edit" title="StockLevel"/>
        <content type="application/xml">
            <m:properties>
                <d:available>5000</d:available>
                <d:productCode>97666</d:productCode>
                <d:integrationKey>97666</d:integrationKey>
            </m:properties>
        </content>
    </entry>
...
```

### Local properties
default properties after initialize

```properties
    odata2services.page.size.max=1000
    odata2services.page.size.default=10
```
### Integration Admin role 
For add `Backoffice Integration Administrator Role` for admin user, import this impex:

```impex
INSERT_UPDATE Employee; UID[unique = true]; groups(uid)[mode = append]
                      ; admin             ;backofficeintegrationagentrole
```

### Postman settings

###### Headers:

 key                | value                   | description                                 |
--------------------|-------------------------|---------------------------------------------|
**Authorization**   | Basic YWRtaW46bmltZGE=  | basic autorisation to odata2webservices     |
**Content-Type**    | application/json        | type of POST content                        |
**Accept**          | application/json        | return your response via json (optional)    |
**Accept-Language** | de                      | Localization for return requests (optional) |
**Content-Language**| de                      | Localization for save requests (optional)   |

###### Manage Environment:

key          | value      |                           
-------------|------------|
**sitename** | EC_NLD_kvn |
**ENV**      | kvb.local  |
**product**  | 97666      |
**catalog**  | Online     |


### Valid responses

Before open this link`s, you need to import [impex](#impex-example)

```http request
GET https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels
```
```http request
DELETE https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels('{{product}}')
```
```http request
POST https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels('{{product}}')
```

you can POST only in `json` format, for change some data, you need send body like this:

```JSON
    {
        "__metadata": {
            "id": "https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels('{{product}}')",
            "uri": "https://{{ENV}}:9002/odata2webservices/GetStockLevel/StockLevels('{{product}}')",
            "type": "HybrisCommerceOData.StockLevel"
        },
        "available": 1000,
        "productCode": "{{product}}",
        "integrationKey": "{{product}}"
    }
```

## HELP URL`S
### Help SAP

- [Integration API Module](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1905/en-US/c8e7a9d3cd5f4240baae493804731155.html)
- [About Integration Objects](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1905/en-US/0e9911b94c8d4120965a9afeccdc663e.html)
- [Integration API Architecture](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1811/en-US/fdfe5d67b6ed44eeb583bfb0c928ac17.html)
- [Creating an EDMX Schema](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1811/en-US/2939a9236bbb44a39da778578afc3f88.html)

### OASIS

- [OData Version 4.01. Part 1: Protocol](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncompute)

### GitHub

- [SAP Odata public repository](https://github.com/SAP/C4CODATAAPIDEVGUIDE)

