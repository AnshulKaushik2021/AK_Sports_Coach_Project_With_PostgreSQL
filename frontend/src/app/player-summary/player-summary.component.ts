// Created by Anshul Kaushik on Sept 4, 2023

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {PlayersService} from '../_services/players.service';
@UntilDestroy()
@Component({
  selector: 'player-summary-component',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerSummaryComponent implements OnInit, OnDestroy {
  // These variables are for the "Efficiency" tab calculations and cover FG%, 3P%, FT% and TS%
  fieldgoal: number;
  threefgoal: number;
  freethrow: number;
  freethrowatt: number;
  fieldgoalper: string;
  threefgoalper: string;
  freethrowper: string;
  totalpoints: number;
  trueshoot: string;
  fieldmessage: string;
  treemessage: string;
  freemessage: string;
  truemessage: string
  totalgames: number;
  
  // The below variables are for the "Shooting % By Zone" tab calculations and cover Restricted Area, Mid-Range, Paint and Three point shooting
  dunkmessage: string;
  paintmessage:string;
  midmessage: string;
  threemessage: string;
  dunka: number = 0;
  dunkm: number = 0;
  painta: number = 0;
  paintm: number = 0;
  mida: number = 0;
  midm: number = 0;
  threea: number = 0;
  threem:number = 0;

  // Variable that stores output of backend
  backendResponse: any;

  // Helper variables
  endpoint: any;
  apiResponse: string;
  playerID: number = 1;

  // Store the individual game stats mainly for the "Per Game Statline" tab 
  namey: string;
  datat: any;
  min: number;
  scavg: number;
  offrebavg: number;
  drebavg: number;
  rebsum: string;
  assistavg: number;
  stlavg: number;
  blkavg: number;
  toavg: number;
  gamesplayed: number;
  gamesstarted: number;
  ofoul: number;
  dfoul: number;
  datey: string;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {
  
  }
  generateShots(n: number){
    //This function takes in an index for the game and creates tables for the corresponding shots of each game.
    this.datat = JSON.parse(this.backendResponse);
    var boddy = document.getElementsByTagName("body")[1];
    this.namey = this.datat.name;
    let listy = this.datat.games[n];
    let shoty = listy.shots;

    // Each game has one shots table that has the variable name headers as one row and then each shot as another row.
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    tbl.setAttribute("border", "2");
    tbl.setAttribute("align", "center");
    tbl.setAttribute("id", "Table1");
    for (let i = 0; i < shoty.length;i++){
      var uno = shoty[i];
      if(i == 0){
        //For the first row, we make the table header row.
        var row = document.createElement("tr");
        var cell = document.createElement("td");

        var cellText = document.createTextNode(`ID`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblBody.appendChild(row);

        var cell = document.createElement("td");
        var cellText = document.createTextNode(`isMake`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode(`LocX`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode(`LocY`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var cellText = document.createTextNode(`Distance`);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      // All subsequent shot data rows are made below using the locationX and Y data to make the new distance stat. An ID for each shot is made so that referencing a shot is easier.
      var booll = uno.isMake;
      var x = parseFloat(uno.locationX);
      var y = parseFloat(uno.locationY);
      var rowd = document.createElement("tr");
      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${i+1}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${booll}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${x}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${y}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      // Distance calculated below of shot from center of basket.
      var com = x*x + y*y;
      var sq = (Math.sqrt(com)).toFixed(1);
      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${sq}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      rowd.setAttribute("align", "right");
      tblBody.appendChild(rowd);
      tbl.appendChild(tblBody);
      boddy.appendChild(tbl);

      //Below we analyze the distance of each shot and add attempts and makes by distance zone for use in "Zones()".
      // We use if and else if to cover the distance specifics of each zone.
      if(parseFloat(sq) > 22.5){
        this.threea += 1;
        if(booll){
          this.threem += 1;
        }
      }
      else if(parseFloat(sq) > 10){
        this.mida += 1;
        if(booll){
          this.midm += 1;
        }
      }
      else if(parseFloat(sq) > 3){
        this.painta +=1;
        if(booll){
          this.paintm +=1;
        }
      }
      else{
        this.dunka +=1;
        if(booll){
          this.dunkm += 1;
        }
      }
    }
  }
  ZoneSetup(){
    // Sets all the global variables used in zone calculations to 0. Used whenever a different player is selected using the dropdown or when loading for the first time.
    this.threea = 0;
    this.threem = 0;
    this.mida = 0;
    this.midm = 0;
    this.painta = 0;
    this.paintm = 0;
    this.dunka = 0;
    this.dunkm = 0;
    this.freethrow = 0;
    this.freethrowatt = 0;
  }
  Zones(){
    // Using the global variables, this function makes a message about a player's shot performance in each zone for output in the "Shooting % by Zone" tab.
    // If shots are taken from a zone, the total shots per game and efficiency are outputted in a message.
    // If none are taken, a different message indicating no shots taken is displayed. This is done for all four zones using an if/else pair for each.
    if(this.threea > 0){
      var num = (100*this.threem/this.threea).toFixed(1);
      var pergame = (this.threea/this.totalgames).toFixed(1);
      this.threemessage = num + "% shooting from Three on " + pergame + " attempts per game";
    }
    else{
      this.threemessage = "No shots taken from Three";
    }
    if(this.mida > 0){
      var num = (100*this.midm/this.mida).toFixed(1);
      var pergame = (this.mida/this.totalgames).toFixed(1);
      this.midmessage = num + "% shooting from Mid-Range (10ft - 3P) on " + pergame + " attempts per game";
    }
    else{
      this.midmessage = "No shots taken from Mid-Range";
    }
    if(this.painta > 0){
      var num = (100*this.paintm/this.painta).toFixed(1);
      var pergame = (this.painta/this.totalgames).toFixed(1);
      this.paintmessage = num + "% shooting from the Paint (3ft - 10ft) on " + pergame + " attempts per game";
    }
    else{
      this.paintmessage = "No shots taken from the Paint";
    }
    if(this.dunka > 0){
      var num = (100*this.dunkm/this.dunka).toFixed(1);
      var pergame = (this.dunka/this.totalgames).toFixed(1);
      this.dunkmessage = num + "% shooting from the Restricted Area (0 - 3ft) on " + pergame + " attempts per game";
    }
    else{
      this.dunkmessage = "No shots taken from the Restricted Area";
    }
  }
  Efficiency(){
    // This function does the calculations for the "Efficiency Tab".
    
    // Here the global variables, that store the attempts and makes from the field, three, and free throw line, are given accurate values.
    this.threefgoal = this.threea;
    this.fieldgoal = this.dunka + this.painta + this.mida + this.threea;
    this.fieldgoalper = ((100*(this.paintm + this.midm + this.threem + this.dunkm))/this.fieldgoal).toFixed(1);
    this.threefgoalper = ((100*(this.threem))/this.threefgoal).toFixed(1);
    this.freethrowper = (100*this.freethrow/this.freethrowatt).toFixed(1);
    this.trueshoot = (100*this.totalpoints/(2*(this.fieldgoal + 0.44 * this.freethrow))).toFixed(1);

    // Next we use a variable perg to store the total shots made per zone in each zone and use an if/else pair to output a message about the shooting in that zone.
    // This is done for all four zones.
    var perg = (this.fieldgoal/this.totalgames).toFixed(1);
    if(this.fieldgoal > 0){
      this.fieldmessage = this.fieldgoalper + "% shooting from the Field on " + perg + " attempts per game";
    }
    else{
      this.fieldmessage = "Zero shots from the Field. I hope they at least burned some calories";
    }
    var perg = (this.threefgoal/this.totalgames).toFixed(1);
    if(this.threefgoal > 0){
      this.treemessage = this.threefgoalper + "% shooting from Three on " + perg + " attempts per game";
    }
    else{
      this.treemessage = "Zero shots from Three. Guess they grew up in the 1960s";
    }
    
    var perg = (this.freethrowatt/this.totalgames).toFixed(1);
    if(this.freethrowatt > 0){
      this.freemessage = this.freethrowper + "% shooting from the Free Throw Line on " + perg + " attempts per game";
    }
    else{
      this.freemessage = "Zero shots from the Free Throw Line. Time to complain on Twitter";
    }
    if(this.fieldgoal > 0){
      this.truemessage = this.trueshoot + "% True Shooting";
    }
    else{
      this.fieldmessage = "Can't have True Shooting without shooting";
    }
  }
  generateTable() {
    // This function creates the tables for each game the player played. These are displayed in the "Games and Shots List"
    // It first goes through the body element of the document and deletes any children as any children currently inserted in there are tables for a different player that aren't needed.
    this.datat = JSON.parse(this.backendResponse);
    var boddy = document.getElementsByTagName("body")[1];
    if(boddy.children.length > 0){
      while(boddy.children.length > 0){
        boddy.removeChild(boddy.children[0]);
      }
    }

    // Now the function creates a table for each game played by the player.
    this.namey = this.datat.name;
    let listy = this.datat.games;
    this.totalgames = listy.length;
    for (let i = 0; i < listy.length;i++){
      // Each game table has two rows. One is the table header row and the other contains the total game stats.
      var uno = listy[i];
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      tbl.setAttribute("border", "2");
      tbl.setAttribute("align", "center");
      tbl.setAttribute("id", "Table1");

      //First row. We create every column of the row as a Node then append it to the row.
      var row = document.createElement("tr");
      var cell = document.createElement("td");

      // The below lines store the corresponding values into the second row by storing the headers as TextNode to eventually be added as children into the row.
      var cellText = document.createTextNode(`Date`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);


      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Minutes`);
      cell.appendChild(cellText);
      row.appendChild(cell);
   

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Points`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`OffensiveRebounds`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`DefensiveRebounds`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Assists`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Steals`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Blocks`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`OffensiveFouls`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`DefensiveFouls`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`Turnovers`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FGM`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FGA`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FG%`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`3PM`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`3PA`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`3P%`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FTM`);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FTA`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      var cell = document.createElement("td");
      var cellText = document.createTextNode(`FT%`);
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);
      
      // Second row.
      // First, calculations and formatting are done for each column and ordered so they match the headers.
      var datey = uno.date;
      var pts = parseInt(uno.points);
      var to = parseInt(uno.turnovers);
      var assi = parseInt(uno.assists);
      var stl = parseInt(uno.steals);
      var blk = parseInt(uno.blocks);
      var oreb = parseInt(uno.offensiveRebounds);
      var dreb = parseInt(uno.defensiveRebounds);
      var of = parseInt(uno.offensiveFouls);
      var df = parseInt(uno.defensiveFouls);
      var min = parseInt(uno.minutes);

      var fga = parseInt(uno.twoPointersAttempted) + parseInt(uno.threePointersAttempted);
      var fgm = parseInt(uno.twoPointersMade) + parseInt(uno.threePointersMade);
      var tga = parseInt(uno.threePointersAttempted);
      var tgm = parseInt(uno.threePointersMade);
      var ftm = parseInt(uno.freeThrowsMade);
      var fta = parseInt(uno.freeThrowsAttempted);
      this.freethrow += ftm;
      this.freethrowatt += fta;
      var ftp = (100*ftm/fta).toFixed(1); 
      var tpp = (100*tgm/tga).toFixed(1); 
      var fgp = (100*fgm/fga).toFixed(1); 
      
      // If no shots are taken for these variables, a blank value is displayed instead.
      if(fga == 0){
        fgp = "";
      }
      if(tga == 0){
        tpp = "";
      }
      if(fta == 0){
        ftp = "";
      }

      // The below lines store the corresponding values into the second row by storing the correct variable values in the TextNode which is eventually appended to the row.
      var rowd = document.createElement("tr");
      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${datey}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${min}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${pts}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${oreb}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${dreb}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${assi}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${stl}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${blk}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${of}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${df}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${to}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${fgm}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${fga}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${fgp}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${tgm}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${tga}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${tpp}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${ftm}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${fta}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      var celld = document.createElement("td");
      var cellTextd = document.createTextNode(`${ftp}`);
      celld.appendChild(cellTextd);
      rowd.appendChild(celld);

      tblBody.appendChild(rowd);
      tbl.appendChild(tblBody);
      boddy.appendChild(tbl);
      console.log(tbl);

      // The generateShots() function is called for each table as this allows the corresponding shots tables to be directly under each game table.
      this.generateShots(i);
    }
  }
  GetPAvg(): void{
    // This function calculates the Per Game averages for the player in the major stat categories and adjusts the global variables for the "Per Game Statline" tab. 
    
    // Set-up variables.
    this.datat = JSON.parse(this.backendResponse)
    this.namey = this.datat.name;
    let listy = this.datat.games;
    var mnum = 0;
    var num = 0;
    var tonum = 0;
    var anum = 0;
    var snum = 0;
    var bnum = 0;
    var ornum = 0;
    var drnum = 0;
    var gamenum = 0;
    var gstart = 0;
    var ofnum = 0;
    var dfnum = 0;
    var len = listy.length;
    var uno = listy[0];

    // Sum up the total stats across all games.
    for (let i = 0; i < listy.length; i++) {
      var uno = listy[i];
      if(uno.isStarter){
        gstart++;
      }
      mnum += parseInt(uno.minutes);
      num += parseInt(uno.points);
      tonum += parseInt(uno.turnovers);
      anum += parseInt(uno.assists);
      snum += parseInt(uno.steals);
      bnum += parseInt(uno.blocks);
      ornum += parseInt(uno.offensiveRebounds);
      drnum += parseInt(uno.defensiveRebounds);
      ofnum += parseInt(uno.offensiveFouls);
      dfnum += parseInt(uno.defensiveFouls);
      gamenum++;
    }
    
    // Store the per game averages of each stat into the respective global variables.
    this.gamesplayed = gamenum;
    this.totalpoints = num;
    this.scavg = parseFloat((num/gamenum).toFixed(1));
    this.offrebavg = parseFloat((ornum/gamenum).toFixed(1));
    this.drebavg = parseFloat((drnum/gamenum).toFixed(1));
    this.rebsum = ((ornum + drnum)/gamenum).toFixed(1);
    this.ofoul = parseFloat((ofnum/gamenum).toFixed(1));
    this.dfoul = parseFloat((dfnum/gamenum).toFixed(1));
    this.assistavg = parseFloat((anum/gamenum).toFixed(1));
    this.stlavg = parseFloat((snum/gamenum).toFixed(1));
    this.blkavg = parseFloat((bnum/gamenum).toFixed(1));
    this.toavg = parseFloat((tonum/gamenum).toFixed(1));
    this.min = parseFloat((mnum/gamenum).toFixed(1));
    this.gamesstarted = gstart;
  }
  ngOnInit(): void {
    // Called to start the API connection. 
    this.playersService.getPlayerSummary(1).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data.apiResponse);
    });
    this.fetchApiResponse();
  }
  ngOnDestroy() {

  }
  changeParams(): void {
    // Calls the initializer function whenever a new drop-down value is pressed.
    this.ngOnInit();
  }
  fetchApiResponse(): void {
    this.playersService.getPlayerSummary(this.playerID).pipe(untilDestroyed(this)).subscribe(data => {
      // Calls each function necessary for the frontend to display properly whenever a new playerID is selected using the dropdown or loading for the first time.
      this.endpoint = data.endpoint;
      this.apiResponse = JSON.stringify(data.apiResponse, null, 2);
      this.backendResponse = this.apiResponse;
      this.ZoneSetup();
      this.GetPAvg();
      this.generateTable();
      this.Zones();
      this.Efficiency();
    });
  }
}