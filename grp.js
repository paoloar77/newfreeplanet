db.getCollection('mygoods').aggregate(
[
  {
    "$match": {
      "$and": [
        {
          "$or": [
            {
              "idContribType": "515a353c002c8298f4495bf7"
            }
          ]
        }
      ]
    }
  },
  {
    "$match": {
      "idapp": "13"
    }
  },
  {
    "$sort": {
      "date_created": -1
    }
  },
  {
    "$addFields": {
      "myId1": {
        "$toObjectId": "$userId"
      }
    }
  },
  {
    "$lookup": {
      "from": "users",
      "localField": "myId1",
      "foreignField": "_id",
      "as": "user"
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          {
            "$arrayElemAt": [
              "$user",
              0
            ]
          },
          "$$ROOT"
        ]
      }
    }
  },
  {
    "$project": {
      "recGood": 1,
      "sectorGood": 1,
      "idSectorGood": 1,
      "idGood": 1,
      "mygood": 1,
      "idStatusSkill": 1,
      "idContribType": 1,
      "idCity": 1,
      "pub_to_share": 1,
      "numLevel": 1,
      "adType": 1,
      "photos": 1,
      "note": 1,
      "website": 1,
      "descr": 1,
      "date_created": 1,
      "date_updated": 1,
      "userId": 1,
      "username": 1,
      "name": 1,
      "surname": 1,
      "comune": 1,
      "mycities": 1,
      "profile.img": 1,
      "profile.mygroups": 1,
      "profile.qualifica": 1
    }
  },
  {
    "$lookup": {
      "from": "goods",
      "localField": "idGood",
      "foreignField": "_id",
      "as": "recGood"
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          {
            "$arrayElemAt": [
              "$recGood",
              0
            ]
          },
          "$$ROOT"
        ]
      }
    }
  },
  {
    "$project": {
      "recGood": 1,
      "sectorGood": 1,
      "idSectorGood": 1,
      "idGood": 1,
      "mygood": 1,
      "idStatusSkill": 1,
      "idContribType": 1,
      "idCity": 1,
      "pub_to_share": 1,
      "numLevel": 1,
      "adType": 1,
      "photos": 1,
      "note": 1,
      "website": 1,
      "descr": 1,
      "date_created": 1,
      "date_updated": 1,
      "userId": 1,
      "username": 1,
      "name": 1,
      "surname": 1,
      "comune": 1,
      "mycities": 1,
      "profile.img": 1,
      "profile.mygroups": 1,
      "profile.qualifica": 1
    }
  },
  {
    "$lookup": {
      "from": "sectorgoods",
      "localField": "recGood.idSectorGood",
      "foreignField": "_id",
      "as": "sectorgood"
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          {
            "$arrayElemAt": [
              "$sectorgood",
              0
            ]
          },
          "$$ROOT"
        ]
      }
    }
  },
  {
    "$project": {
      "recGood": 1,
      "sectorGood": 1,
      "idSectorGood": 1,
      "idGood": 1,
      "mygood": 1,
      "idStatusSkill": 1,
      "idContribType": 1,
      "idCity": 1,
      "pub_to_share": 1,
      "numLevel": 1,
      "adType": 1,
      "photos": 1,
      "note": 1,
      "website": 1,
      "descr": 1,
      "date_created": 1,
      "date_updated": 1,
      "userId": 1,
      "username": 1,
      "name": 1,
      "surname": 1,
      "comune": 1,
      "mycities": 1,
      "profile.img": 1,
      "profile.mygroups": 1,
      "profile.qualifica": 1
    }
  },
  {
    "$lookup": {
      "from": "cities",
      "localField": "idCity",
      "foreignField": "_id",
      "as": "mycities"
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          {
            "$arrayElemAt": [
              "$mycities",
              0
            ]
          },
          "$$ROOT"
        ]
      }
    }
  },
  {
    "$project": {
      "recGood": 1,
      "sectorGood": 1,
      "idSectorGood": 1,
      "idGood": 1,
      "mygood": 1,
      "idStatusSkill": 1,
      "idContribType": 1,
      "idCity": 1,
      "pub_to_share": 1,
      "numLevel": 1,
      "adType": 1,
      "photos": 1,
      "note": 1,
      "website": 1,
      "descr": 1,
      "date_created": 1,
      "date_updated": 1,
      "userId": 1,
      "username": 1,
      "name": 1,
      "surname": 1,
      "comune": 1,
      "mycities": 1,
      "profile.img": 1,
      "profile.mygroups": 1,
      "profile.qualifica": 1
    }
  },
  {
    "$match": {
      "$or": [
        {
          "$and": [
          {
              "profile.mygroups": {
                "$elemMatch": {
                  "groupname": {
                    "$in": [
                      "000017",
                      "VillaggiamoItalia",
                      "Terraw",
                      "RisoBenevento",
                      "111"
                    ]
                  }
                }
              }
            },
             { 
              "pub_to_share": 1,
             }
          ]
        },
        {
          "pub_to_share": 0,
        }
      ]
    }
  },
  {
    "$match": {
      "$and": [
        {
          "mycities.reg": "EMR"
        },
        {
          "mycities.prov": "RN"
        }
      ]
    }
  },
  {
    "$group": {
      "_id": null,
      "count": {
        "$sum": 1
      },
      "results": {
        "$push": "$$ROOT"
      }
    }
  },
  {
    "$project": {
      "count": 1,
      "rows": {
        "$slice": [
          "$results",
          0,
          20
        ]
      }
    }
  }
]
)