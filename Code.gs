function grabBECData() {
  var race = null;
  var raceData = null;
  var precinctList = [
        "Precinct 1",
        "Precinct 2",
        "Precinct 3",
        "Precinct 4",
        "Precinct 5",
        "Precinct 6",
        "Precinct 7",
        "Precinct 8",
        "Precinct 9",
        "Precinct 10",
        "Precinct 11",
        "Precinct 12",
        "Precinct 13",
        "Precinct 14",
        "Precinct 15",
        "Precinct 16",
        "Precinct 17",
        "Precinct 18",
        "Precinct 19",
        "Precinct 20",
        "Precinct 21",
        "Precinct 22",
        "Precinct 23",
        "Precinct 24",
        "Precinct 25",
        "Precinct 26",
        "Precinct 27",
        "Precinct 28",
        "Precinct 29",
        "Precinct 30",
        "Precinct 31",
        "Precinct 32",
        "Precinct 33",
        "Precinct 34",
        "Precinct 35",
        "Precinct 36",
        "Precinct 37",
        "Precinct 38",
        "Precinct 39",
        "Precinct 40",
        "Precinct 41",
        "Precinct 42",
        "Precinct 43",
        "Precinct 44",
        "Precinct 45",
        "Precinct 46",
        "Precinct 47",
        "Precinct 48",
        "Precinct 49",
        "Precinct 50",
        "Precinct 51",
        "Precinct 52"
      ];
  
  //                            The URL below needs to be updated for the specific election
  //                            once the BEC posts the link to the "Zero Results" page on their website.
  var json = UrlFetchApp.fetch("http://results.enr.clarityelections.com/IL/Bloomington/77125/213448/json/details.json").getContentText();
  //                                                                                               /json/sum.json shows candidate names
  //
  //                            Once you've got the URL for the upcoming election, go through the "races" array
  //                            and update the columns based on the candidates shown in /json/sum.json.
  //                            You don't have to track every race; you can list only the ones you're actually interested in.
  
  var data = JSON.parse(json);
  var contests = data.Contests;
  
  var races = [ // Enter the race IDs and result ranges here. Be CERTAIN that the candidates' names appear in the same order.
    {
      "raceID":      "0301",    // GOVERNOR AND LIEUTENANT GOVERNOR
      "resultRange": "B3:F54"
    },
    {
      "raceID":      "0310",    // REP IN THE GEN ASSEM 88TH REP DIST
      "resultRange": "G3:H54"
    },
    {
      "raceID":      "0311",    // REP IN THE GEN ASSEM 105TH REP DIST
      "resultRange": "I3:J54"
    },
    {
      "raceID":      "0306",    // REP IN CONGRESS THIRTEENTH CONG DIST
      "resultRange": "K3:L54"
    },
    {
      "raceID":      "0307",    // REP IN CONGRESS EIGHTEENTH CONG DIST
      "resultRange": "M3:N54"
    },
    {
      "raceID":      "0312",    // McLEAN COUNTY CLERK
      "resultRange": "O3:Q54"
    },
    {
      "raceID":      "0316",    // McLEAN COUNTY BOARD DISTRICT 4
      "resultRange": "R3:T54"
    },
    {
      "raceID":      "0317",    // McLEAN COUNTY BOARD DISTRICT 7
      "resultRange": "U3:W54"
    },
    {
      "raceID":      "0318",    // McLEAN COUNTY BOARD DISTRICT 8
      "resultRange": "X3:Z54"
    },
    {
      "raceID":      "0319",    // McLEAN COUNTY BOARD DISTRICT 9
      "resultRange": "AA3:AC54"
    },
    {
      "raceID":      "0330",    // CITYWIDE PROPOSITION - SHALL THE CITY ELECTION LAW BE REJECTED?
      "resultRange": "AD3:AE54"
    }
  ];
  
  for(var i = 0; i < races.length; i++) {
    race = races[i];
    Logger.log("Starting raceID " + race.raceID);
    for(var j = 0; j < contests.length; j++) {
      if(contests[j].K == race.raceID) {
        raceData = contests[j];
      }
    }
    displayBECData(raceData, race.resultRange, precinctList);
    Logger.log("Ending raceID " + race.raceID);
  }
}
function displayBECData(raceData, resultRange, precinctList) {
  var precinctNumber = null;
  var resultCells = SpreadsheetApp.getActiveSpreadsheet().getRange("'Online Results - BEC'!" + resultRange);
  var blankArray = new Array(raceData.V[0].length);
  
  for(var i = 0; i < blankArray.length; i++) {
    blankArray[i] = "";
  }
  
  if(raceData.P.length != precinctList.length) {
    for(var i = 0; i < precinctList.length; i++) {
      if(raceData.P[i] != precinctList[i]) {
        raceData.P.splice(i, 0, precinctList[i]);
        raceData.V.splice(i, 0, blankArray);
      }
    }
  }
  
  resultCells.setValues(raceData.V);
}
