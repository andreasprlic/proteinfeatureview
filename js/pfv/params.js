/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }}
 *
 *  Draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */

define(['colors'],
  function(colors) {
    function Params() {
      this.textLeft = 20;
      this.leftBorder = 130;
      this.bottomBorder = 15;
      this.trackHeight = 10;
      this.trackHeightCharts = 20;
      this.rightBorder = 10;

      this.maxTracksSingleMode = 10;

      // maximum font size for displayed text (e.g. amino acids, when zoomed into sequence)
      this.maxTextSize = 10;
      this.scale = -1;

      this.y = 0;
      this.maxY = 0;

      this.baseLineHeight = 3;

      this.bw_colors = colors.rgb.getBWPalette();

      this.paired_colors = colors.rgb.getPairedColorPalette();

      this.domain_colors = colors.rgb.getDomainColors();

      this.redblue_colors = colors.rgb.getRedBluePalette().reverse();


      this.customColors = [];
      this.customColors.push(this.paired_colors[0]);
      this.customColors.push(this.paired_colors[1]);
      this.customColors.push(this.paired_colors[8]);
      this.customColors.push(this.paired_colors[9]);


      // homology models...
      this.homColors = [];
      this.homColors.push(this.paired_colors[5]);
      this.homColors.push(this.paired_colors[4]);


      this.up_colors = [];
      this.up_colors.push(this.paired_colors[2]);
      this.up_colors.push(this.paired_colors[3]);

      this.expressionTagColor = colors.rgb.getDomainColors()[0];
      this.conflictColor = colors.rgb.getRedBluePalette()[
        colors.rgb.getRedBluePalette().length - 1];

      this.deletionColor = this.paired_colors[6];
    }


    return {
      Params: function() {
        return new Params();
      }
    };

  });
