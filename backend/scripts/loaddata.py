import json
import psycopg2

# Created by Anshul Kaushik on Sept 4, 2023

# Each of the three JSON files containing data are loaded and stored into variables.
with open('games.json') as g:
    datag = json.load(g)
with open('players.json') as p:
    datap = json.load(p)
with open('teams.json') as t:
    datat = json.load(t)
    
# The PostgresSQL database with the game data is connected to and authenticated to.
conn = psycopg2.connect(host="localhost", database="okc", user="okcapplicant", password="thunder")

# Lists for each field containing the names of the columns of each table. Used in making tuples to send to the tables of the database.
teamfields = [
    'id',
    'name'
]
playersfields = [
    'id',
    'name'
]
sfields = [
    'isMake',
    'locationX',
    'locationY'
]
plfields = [
    'id',
    'isStarter',
    'minutes',
    'points',
    'assists',
    'offensiveRebounds',
    'defensiveRebounds',
    'steals',
    'blocks',
    'turnovers',
    'defensiveFouls',
    'offensiveFouls',
    'freeThrowsMade',
    'freeThrowsAttempted',
    'twoPointersMade',
    'twoPointersAttempted',
    'threePointersMade',
    'threePointersAttempted'
]
gfields = [
    'id',
    'date'
]

# Each table is cleared of all data to avoid duplication by using the cursor.
cur = conn.cursor()
cur.execute('DELETE FROM "OKC_HomeTeamShots"')
cur.execute('DELETE FROM "OKC_AwayTeamShots"')
cur.execute('DELETE FROM "OKC_HomeTeamStatlines"')
cur.execute('DELETE FROM "OKC_AwayTeamStatlines"')
cur.execute('DELETE FROM "OKC_Games"')
cur.execute('DELETE FROM "OKC_Teams"')
cur.execute('DELETE FROM "OKC_Players"')

# Loads data into OKC_Teams table using teamfields and JSON data
for dat in datat:
    my_dat = [dat[field] for field in teamfields]
    cur.execute('INSERT INTO "OKC_Teams" ("TeamID", "Name") VALUES (%s, %s)', tuple(my_dat))
    
# Loads data into OKC_Players table using playersfields and JSON data
for dat in datap:
    my_dat = [dat[field] for field in playersfields]
    cur.execute('INSERT INTO "OKC_Players" ("PlayerID", "Name") VALUES (%s, %s)', tuple(my_dat))
    
# This for loop inserts the data into OKC_Games using gfields and JSON data. This table is done first as other tables have Foreign Keys dependent on this table.
hlist = 1;
alist = 1;
for gg in datag:
    # Each variable to be inserted into the table is gathered using the JSON data.
    gid = gg['id']
    s = gg['date']
    homey = gg['homeTeam']
    awayy = gg['awayTeam']
    htid = homey['id']
    awid = awayy['id']
    
    # A tuple is created holding all column values of a row. This tuple is then inserted into the OKC_Games table. The ID variables are incremented when needed to match the schema.
    ftuple = ()
    ftuple += tuple([gg[gfield] for gfield in gfields])
    ftuple += (htid,awid,hlist,alist)
    cur.execute('INSERT INTO "OKC_Games" ("GameID", "Date","HomeTeamID","AwayTeamID","HomeTeamStatlineID", "AwayTeamStatlineID") VALUES (%s,%s, %s,%s,%s,%s)', tuple(ftuple))
    hlist +=1;
    alist +=1;
    
# This for loop inserts the data into OKC_HomeTeamStatlines and OKC_AwayTeamStatlines using JSON data. The loop contains one for loop to insert all the HomeTeam statlines data and another for loop for the AwayTeam.
pllist = 1;
hlist = 1;
alist = 1;
for gg in datag:
    # HomeTeam and AwayTeam lists used for the internal for loops
    homey = gg['homeTeam']
    awayy = gg['awayTeam']
    
    # HomeTeam for loop
    for p in homey["players"]:
        # A tuple is made here with all the data in a row to be inserted into the table. The necessary ID variables are incremented for successive iterations of the loop. Data is gathered from ID variables, JSON data, and sorted using the plfields list.
        my_play = ()
        my_play += (pllist,)
        my_play += tuple([p[plfield] for plfield in plfields])
        my_play += (hlist,)
        cur.execute('INSERT INTO "OKC_HomeTeamStatlines" ("HomeStatlineID","PlayerID", "IsStarter","Minutes","Points","Assists","OffensiveRebounds","DefensiveRebounds","Steals","Blocks","Turnovers","DefensiveFouls",    "OffensiveFouls",    "FreeThrowsMade",    "FreeThrowsAttempted",    "TwoPointersMade",    "TwoPointersAttempted",    "ThreePointersMade","ThreePointersAttempted","StatlineID") VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s,%s)', tuple(my_play))
        hlist += 1
    
    # AwayTeam for loop
    for p in awayy["players"]:
        # A tuple is made here with all the data in a row to be inserted into the table. The necessary ID variables are incremented for successive iterations of the loop. Data is gathered from ID variables, JSON data, and sorted using the plfields list.
        my_play = ()
        my_play += (pllist,)
        my_play += tuple([p[plfield] for plfield in plfields])
        my_play += (alist,)
        cur.execute('INSERT INTO "OKC_AwayTeamStatlines" ("AwayStatlineID","PlayerID", "IsStarter","Minutes","Points","Assists","OffensiveRebounds","DefensiveRebounds","Steals","Blocks","Turnovers","DefensiveFouls",    "OffensiveFouls",    "FreeThrowsMade",    "FreeThrowsAttempted",    "TwoPointersMade",    "TwoPointersAttempted",    "ThreePointersMade","ThreePointersAttempted","StatlineID") VALUES (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s, %s,%s,%s)', tuple(my_play))
        alist += 1
    pllist += 1
    
# This for loop inserts the data into OKC_HomeTeamShots and OKC_AwayTeamShots using JSON data. This loop is done last due to ForeignKey dependency.
awlist = 1;
hlist = 1;
hsid = 1;
asid = 1;
pstid = 1;
slist = 1;
for gg in datag:
    # HomeTeam and AwayTeam lists used for the internal for loops
    homey = gg['homeTeam']
    awayy = gg['awayTeam']
    
    # HomeTeam for loop
    for p in homey["players"]:
        #HomeTeamShots for loop
        for s in p["shots"]:
        
            # A tuple is made here with all the data in a row to be inserted into the shots table. The necessary ID variables are incremented for successive iterations of the loop. Data is gathered from ID variables, JSON data, and sorted using the sfields list.
            my_ss = ()
            my_ss += (hsid,)
            my_ss += (hlist,)
            my_ss += tuple([s[sfield] for sfield in sfields])
            cur.execute('INSERT INTO "OKC_HomeTeamShots" ("ShotID", "ShotChartID", "IsMake","LocX","LocY") VALUES (%s, %s,%s,%s,%s)', tuple(my_ss))
            hsid += 1
        hlist += 1
    # AwayTeam for loop
    for p in awayy["players"]:
        #AwayTeamShots for loop
        for s in p["shots"]:
        
            # A tuple is made here with all the data in a row to be inserted into the shots table. The necessary ID variables are incremented for successive iterations of the loop. Data is gathered from ID variables, JSON data, and sorted using the sfields list.
            my_ss = ()
            my_ss += (asid,)
            my_ss += (awlist,)
            my_ss += tuple([s[sfield] for sfield in sfields])
            cur.execute('INSERT INTO "OKC_AwayTeamShots" ("ShotID","ShotChartID", "IsMake","LocX","LocY") VALUES (%s, %s,%s,%s,%s)', tuple(my_ss))
            asid += 1
        awlist += 1
    slist += 1

# Our stored changes using the cursor conn are commited. The data is now added to the database and we close the cursor and the connection.
conn.commit()

cur.close()
conn.close()
