# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class OkcAwayteamshots(models.Model):
    isMake = models.BooleanField(db_column='IsMake', blank=True, null=True)  # Field name made lowercase.
    locationX = models.FloatField(db_column='LocX', blank=True, null=True)  # Field name made lowercase.
    locationY = models.FloatField(db_column='LocY', blank=True, null=True)  # Field name made lowercase.
    shotid = models.IntegerField(db_column='ShotID', primary_key=True)  # Field name made lowercase.
    shotchartid = models.ForeignKey('OkcAwayteamstatlines', models.DO_NOTHING, db_column='ShotChartID', to_field='statlineid', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_AwayTeamShots'


class OkcAwayteamstatlines(models.Model):
    playerid = models.ForeignKey('OkcPlayers', models.DO_NOTHING, db_column='PlayerID', to_field='playerid', blank=True, null=True)  # Field name made lowercase.
    isStarter = models.BooleanField(db_column='IsStarter', blank=True, null=True)  # Field name made lowercase.
    minutes = models.IntegerField(db_column='Minutes', blank=True, null=True)  # Field name made lowercase.
    points = models.IntegerField(db_column='Points', blank=True, null=True)  # Field name made lowercase.
    assists = models.IntegerField(db_column='Assists', blank=True, null=True)  # Field name made lowercase.
    offensiveRebounds = models.IntegerField(db_column='OffensiveRebounds', blank=True, null=True)  # Field name made lowercase.
    defensiveRebounds = models.IntegerField(db_column='DefensiveRebounds', blank=True, null=True)  # Field name made lowercase.
    steals = models.IntegerField(db_column='Steals', blank=True, null=True)  # Field name made lowercase.
    blocks = models.IntegerField(db_column='Blocks', blank=True, null=True)  # Field name made lowercase.
    turnovers = models.IntegerField(db_column='Turnovers', blank=True, null=True)  # Field name made lowercase.
    defensiveFouls = models.IntegerField(db_column='DefensiveFouls', blank=True, null=True)  # Field name made lowercase.
    offensiveFouls = models.IntegerField(db_column='OffensiveFouls', blank=True, null=True)  # Field name made lowercase.
    freeThrowsMade = models.IntegerField(db_column='FreeThrowsMade', blank=True, null=True)  # Field name made lowercase.
    freeThrowsAttempted = models.IntegerField(db_column='FreeThrowsAttempted', blank=True, null=True)  # Field name made lowercase.
    twoPointersMade = models.IntegerField(db_column='TwoPointersMade', blank=True, null=True)  # Field name made lowercase.
    twoPointersAttempted = models.IntegerField(db_column='TwoPointersAttempted', blank=True, null=True)  # Field name made lowercase.
    threePointersMade = models.IntegerField(db_column='ThreePointersMade', blank=True, null=True)  # Field name made lowercase.
    threePointersAttempted = models.IntegerField(db_column='ThreePointersAttempted', blank=True, null=True)  # Field name made lowercase.
    statlineid = models.IntegerField(db_column='StatlineID', primary_key=True)  # Field name made lowercase.
    awaystatlineid = models.ForeignKey('OkcGames', models.DO_NOTHING, db_column='AwayStatlineID', to_field='awayteamstatlineid', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_AwayTeamStatlines'


class OkcGames(models.Model):
    gameid = models.IntegerField(db_column='GameID', primary_key=True)  # Field name made lowercase.
    date = models.TextField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    hometeamid = models.ForeignKey('OkcTeams', models.DO_NOTHING, db_column='HomeTeamID',related_name='friends', to_field='teamid', blank=True, null=True)  # Field name made lowercase.
    awayteamid = models.ForeignKey('OkcTeams', models.DO_NOTHING, db_column='AwayTeamID', to_field='teamid' , blank=True, null=True)  # Field name made lowercase.
    hometeamstatlineid = models.IntegerField(db_column='HomeTeamStatlineID', unique=True, blank=True, null=True)  # Field name made lowercase.
    awayteamstatlineid = models.IntegerField(db_column='AwayTeamStatlineID', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_Games'


class OkcHometeamshots(models.Model):
    isMake = models.BooleanField(db_column='IsMake', blank=True, null=True)  # Field name made lowercase.
    locationX = models.FloatField(db_column='LocX', blank=True, null=True)  # Field name made lowercase.
    locationY = models.FloatField(db_column='LocY', blank=True, null=True)  # Field name made lowercase.
    shotid = models.IntegerField(db_column='ShotID', primary_key=True)  # Field name made lowercase.
    shotchartid = models.ForeignKey('OkcHometeamstatlines', models.DO_NOTHING, db_column='ShotChartID', to_field='statlineid', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_HomeTeamShots'


class OkcHometeamstatlines(models.Model):
    playerid = models.ForeignKey('OkcPlayers', models.DO_NOTHING, db_column='PlayerID', to_field='playerid', blank=True, null=True)  # Field name made lowercase.
    isStarter = models.BooleanField(db_column='IsStarter', blank=True, null=True)  # Field name made lowercase.
    minutes = models.IntegerField(db_column='Minutes', blank=True, null=True)  # Field name made lowercase.
    points = models.IntegerField(db_column='Points', blank=True, null=True)  # Field name made lowercase.
    assists = models.IntegerField(db_column='Assists', blank=True, null=True)  # Field name made lowercase.
    offensiveRebounds = models.IntegerField(db_column='OffensiveRebounds', blank=True, null=True)  # Field name made lowercase.
    defensiveRebounds = models.IntegerField(db_column='DefensiveRebounds', blank=True, null=True)  # Field name made lowercase.
    steals = models.IntegerField(db_column='Steals', blank=True, null=True)  # Field name made lowercase.
    blocks = models.IntegerField(db_column='Blocks', blank=True, null=True)  # Field name made lowercase.
    turnovers = models.IntegerField(db_column='Turnovers', blank=True, null=True)  # Field name made lowercase.
    defensiveFouls = models.IntegerField(db_column='DefensiveFouls', blank=True, null=True)  # Field name made lowercase.
    offensiveFouls = models.IntegerField(db_column='OffensiveFouls', blank=True, null=True)  # Field name made lowercase.
    freeThrowsMade = models.IntegerField(db_column='FreeThrowsMade', blank=True, null=True)  # Field name made lowercase.
    freeThrowsAttempted = models.IntegerField(db_column='FreeThrowsAttempted', blank=True, null=True)  # Field name made lowercase.
    twoPointersMade = models.IntegerField(db_column='TwoPointersMade', blank=True, null=True)  # Field name made lowercase.
    twoPointersAttempted = models.IntegerField(db_column='TwoPointersAttempted', blank=True, null=True)  # Field name made lowercase.
    threePointersMade = models.IntegerField(db_column='ThreePointersMade', blank=True, null=True)  # Field name made lowercase.
    threePointersAttempted = models.IntegerField(db_column='ThreePointersAttempted', blank=True, null=True)  # Field name made lowercase.
    statlineid = models.IntegerField(db_column='StatlineID', primary_key=True)  # Field name made lowercase.
    homestatlineid = models.ForeignKey('OkcGames', models.DO_NOTHING, db_column='HomeStatlineID', to_field='hometeamstatlineid', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_HomeTeamStatlines'


class OkcPlayers(models.Model):
    playerid = models.IntegerField(db_column='PlayerID', primary_key=True)  # Field name made lowercase.
    name = models.TextField(db_column='Name', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_Players'


class OkcTeams(models.Model):
    teamid = models.IntegerField(db_column='TeamID', primary_key=True)  # Field name made lowercase.
    name = models.TextField(db_column='Name', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'OKC_Teams'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
