# -*- coding: utf-8 -*-
# Created by Anshul Kaushik on Sept 4, 2023


import logging
from functools import partial
import json
import os

from django.core.serializers import serialize
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
# 'Models.py' created from the Postgres database is stored as md.
from app import models as md
from django.db import models
    
LOGGER = logging.getLogger('django')
class PlayerSummary(APIView):
    logger = LOGGER
    def get(self, request, playerID):
        # These lines use a QuerySet in the OKC_Players class to get the name of the player for the matching PlayerID.
        namedatad  = md.OkcPlayers.objects.get(playerid = playerID)
        namedata = getattr(namedatad,"name")
        
        # Since we have a Home and Away table for the player statlines, we make two variables to hold the list of the QuerySets of all statlines recorded by the player.
        datah  = list(md.OkcHometeamstatlines.objects.filter(playerid = playerID))
        dataaw  = list(md.OkcAwayteamstatlines.objects.filter(playerid = playerID))
        
        # Future arrays are made here
        datac = []
        FINARR = []
        
        # This for loop is for the hometeam statline list
        for d in datah:
           datad = []
           
           # Here the date of the game is aquired using the Foreign Key's call to the main Games table.
           psi = d.homestatlineid
           datearr = psi.date
           num = d.statlineid
           
           # datac stores all the variables in the HomeTeamStatlines table for use in the display.
           datac = md.OkcHometeamstatlines.objects.filter(statlineid = num)
           
           # datad stores a list of every Shot table whose shotchartid Foreign Key matches the Primary Key of the object d in datah
           datad = list(md.OkcHometeamshots.objects.filter(shotchartid = num))
           
           # Both datac and datad are converted into JSON format for ease of display.
           serialized_data = serialize("json", datac)
           datac = json.loads(serialized_data)
           serialized_data = serialize("json", datad)
           datad = json.loads(serialized_data)
           
           # The fields of each member of datad are put into the array f.
           f = []
           for d in datad:
                f.append(d["fields"])
                
           # The fields of datac are stored into findata. Information not found in the "sample_response.json" file is removed from fidata.
           findata = datac[0]
           fidata = findata["fields"]
           del fidata['playerid']
           del fidata['homestatlineid']
           
           # A key value pair for the date is made.
           dicty = {'date': datearr}
           
           # Information not found in the "sample_response.json" file is removed from each member of f.
           for subf in f:
               del subf['shotchartid']
               
           # The shots attribute of fidata is given actual data of each corresponding shot stored in f.
           fidata['shots'] = f
           dicty.update(fidata)
           
           # As the "sample_response.json" is stored by earliest date to latest, the index count is given a value as to where to place the new game based on its date.
           count = 0
           for thingy in FINARR:
                if(dicty['date'] > thingy['date']):
                    count += 1
                    
           # The game is inserted into the FINARR array.
           FINARR.insert(count,dicty)
           
        # This loop is for the awayteam statline list.
        for d in dataaw:
           datad = []
           
           # Here the date of the game is aquired using the Foreign Key's call to the main Games table.
           psi = d.awaystatlineid
           datearr = psi.date
           num = d.statlineid

           # datac stores all the variables in the HomeTeamStatlines table for use in the display.
           datac = md.OkcAwayteamstatlines.objects.filter(statlineid = num)
           
           # datad stores a list of every Shot table whose shotchartid Foreign Key matches the Primary Key of the object d in dataaw
           datad = list(md.OkcAwayteamshots.objects.filter(shotchartid = num))
           
           # Both datac and datad are converted into JSON format for ease of display.
           serialized_data = serialize("json", datac)
           datac = json.loads(serialized_data)
           serialized_data = serialize("json", datad)
           datad = json.loads(serialized_data)
           
           # The fields of each member of datad are put into the array f.
           f = []
           for d in datad:
                f.append(d["fields"])
                
           # The fields of datac are stored into findata. Information not found in the "sample_response.json" file is removed from fidata.
           findata = datac[0]
           fidata = findata["fields"]
           del fidata['playerid']
           del fidata['awaystatlineid']
           
           # A key value pair for the date is made.
           dicty = {'date': datearr}
           
           # Information not found in the "sample_response.json" file is removed from each member of f.
           for subf in f:
                del subf['shotchartid']
            
           # The shots attribute of fidata is given actual data of each corresponding shot stored in f.
           fidata['shots'] = f
           dicty.update(fidata)
           
           # As the "sample_response.json" is stored by earliest date to latest, the index count is given a value as to where to place the new game based on its date.
           count = 0
           for thingy in FINARR:
                if(dicty['date'] > thingy['date']):
                    count += 1
                
           # The game is inserted into the FINARR array.
           FINARR.insert(count,dicty)
        
        # The final formatting is done by using each game in FINARR and the namedata.
        result = {
            "name": namedata,
            "games": (f for f in FINARR)
        }
        return Response(result)
