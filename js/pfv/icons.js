/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }}
 *
 *  Draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */

define(
  function() {
    function Icons() {

      // a path for an eye icon -
      // from https://upload.wikimedia.org/wikipedia/commons/6/68/Eye_open_font_awesome.svg

      this.eye = "m 1664,576 q -152,236 -381,353 61,-104 61,-225 0,-185 -131.5,-316.5 "+
      "Q 1081,256 896,256 711,256 579.5,"+
      "387.5 448,519 448,704 448,825 509,929 280,812 128,576 261,371 461.5,249.5 662,128 "+
      "896,128 1130,128 1330.5,249.5 "+
      "1531,371 1664,576 z M 944,960 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,"+
      "829 592,704 q 0,-20 14,-34 14,"+
      "-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 "+
      "z m 848,-384 q 0,-34 -20,-69 "+
      "Q 1632,277 1395.5,138.5 1159,0 896,0 633,0 396.5,139 160,278 20,507 0,542 0,576 q "+
      "0,34 20,69 140,229 376.5,368 "+
      "236.5,139 499.5,139 263,0 499.5,-139 236.5,-139 376.5,-368 20,-35 20,-69 z";
    }


    return {
      Icons: function() {
        return new Icons();
      }
    };

  });
