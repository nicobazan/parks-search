const parkSearch = {

   "Type": "AWS::Elasticsearch::Domain",
   "Properties": {
      "DomainName": "parks-search",
      "ElasticsearchClusterConfig": {
         "DedicatedMasterEnabled": "true",
         "InstanceCount": "2",
         "ZoneAwarenessEnabled": "true",
         "InstanceType": "t2.small.elasticsearch",
         "DedicatedMasterType": "t2.small.elasticsearch",
         "DedicatedMasterCount": "3"
      },
      "EBSOptions": {
         "EBSEnabled": true,
         "VolumeSize": 10,

      }
   },
   // "Outputs": {
   //    "ParksSearchDomain": {
   //       "Value": {
   //          "Fn::GetAtt": [
   //             "ElasticsearchDomain",
   //             "DomainEndpoint"
   //          ]
   //       }
   //    }

   // }

}

export { parkSearch };