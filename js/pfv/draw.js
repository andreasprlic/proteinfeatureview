/* -*- mode: javascript; c-basic-offset: 4; indent-tabs-mode: nil -*- */
/*jslint maxlen: 120 */
/*global $:false */
/**
 *  Protein Feature View v. {{ VERSION }} build {{ BUILD }}
 *
 *  Draws a graphical summary of PDB and UniProtKB relationships for a single UniProtKB sequence.
 *
 *  @author Andreas Prlic
 */


/**
 * Provides the "view" of the data
 */

define(['params', 'colors', 'icons', 'popups'],
  function(params, colors, icons, popups) {

    var colorDict = {};

    function Draw(viewer) {

      this.viewer = viewer;

      this.param = new params.Params();

      this.icons = new icons.Icons();

      this.popups = new popups.Popups();

      this.popups.init(this.viewer, this.viewer.rcsbServer);

      this.scale = 1;

      this.height = 15;

      this.maxY = 0;


      // var svg = viewer.getSVGWrapper();

      // this.defaultGroup = svg.group({
      //               id: 'defaultGroup',
      //               fontWeight: 'bold',
      //               fontSize: '10', fill: 'black'
      //           }
      //       );

    }

    Draw.prototype.getParams = function() {
      return this.param;
    };

    Draw.prototype.getGroup = function(id) {

      var svg = this.viewer.getSVGWrapper();

      var g = svg.group({
        id: id,
        'font-family': 'Roboto',
        'font-weight': 700,
        fontSize: '10',
        fill: 'black'
      });
      return g;
    };

    Draw.prototype.seq2Screen = function(seqpos) {


      return this.param.leftBorder + Math.round(seqpos * this.scale);


    };

    Draw.prototype.screen2Seq = function(screenX) {


      return Math.round((screenX - this.param.leftBorder) / this.scale);


    };



    /** Draw the ruler, which indicated sequence positions
     *
     * @param svg
     * @param sequence
     * @param y
     * @returns
     */
    Draw.prototype.drawRuler = function(svg, sequence, y) {

      var majorTickHeight = 5;
      var minorTickHeight = 2;

      svg.rect(this.seq2Screen(0), y, sequence.length * this.scale, 1, {
        fill: 'black'
      });

      var prevTick = 0;
      for (var i = 0; i < sequence.length; i++) {


        if (((i + 1) % 50) === 0 && (i - prevTick) * this.scale >
          ((Math.log(i) / Math.log(10) + 1) * 10)) {
          this.drawTick(svg, i, y, majorTickHeight);
          prevTick = i;
        } else if (this.scale > 2) {
          if (((i + 1) % 10) === 0) {
            this.drawTick(svg, i, y, minorTickHeight);
          } else if (this.scale > 4) {
            if (((i + 1) % 5) === 0) {
              svg.rect(this.seq2Screen(i), y, 1 * this.scale, 4, {
                fill: 'black'
              });
            }
          }

          if (this.scale > 8) {
            svg.rect(this.seq2Screen(i), y, 1, 2, {
              fill: 'black'
            });
          }
        }
      }

      return y + this.param.trackHeight + 10;


    };


    //  draw DB id at beginning of line
    Draw.prototype.drawName = function(svg, g, ty, text, callbackFunction, label) {


      var txt = svg.text(g, this.param.textLeft + 2, ty + this.param.trackHeight - 1, text, {
        style: {
          'font-family': 'RobotoSlab, sans-serif;',
          'font-weight': '900'
        }
      });


      if (typeof callbackFunction !== 'undefined') {

        $(txt).css('cursor', 'pointer');

        $(txt).bind('click', function(event) {
          callbackFunction(event, text);
        });

      }

      if (typeof label !== 'undefined') {

        $(txt).attr("title", label);
        this.registerTooltip(txt);
      } else {
        console.log("no label for track " + text);
      }

    };

    Draw.prototype.drawSequence = function(svg, sequence, y) {

      var seqTrackHeight = this.param.trackHeight + 5;

      if (this.param.singlePDBmode) {
        seqTrackHeight -= 5;
      }

      var g = this.getGroup('sequenceTrack' + this.viewer.getData().uniprotID);
      var blg = svg.group({
        fill: 'lightgrey'
      });
      var bg = svg.group({
        fill: '#dcdcdc'
      });

      this.drawName(svg, g, y, sequence.name, undefined, "UniProtKB sequence " + sequence.name);

      var gs = svg.group({
        id: 'seqpos' + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });

      var defs = svg.defs();

      svg.linearGradient(defs, 'sequence' + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', 'black']
        ],
        0, y, 0, y + seqTrackHeight, {
          gradientUnits: 'userSpaceOnUse'

        }
      );


      var rect = svg.rect(g, this.seq2Screen(0), y, sequence.length * this.scale, seqTrackHeight,
        4, 4, {
          fill: 'url(#sequence' + this.viewer.getData().uniprotID + ')',
          stroke: 'grey',
          strokeWidth: 1
        });


      var title = "UniProtKB sequence " + sequence.name + " - " +
        this.viewer.getData().name + " Length: " + this.viewer.getData().length;

      $(rect).attr('title', title);

      this.registerTooltip(rect);

      y += seqTrackHeight;

      // add label on sequence

      var label = sequence.name + " - " + this.viewer.getData().name + " - " +
        this.viewer.getData().desc;

      var slabel = svg.text(g, this.seq2Screen(1), y - this.param.trackHeight / 2, label, {
        'fill': 'black'
      });
      this.checkTxtLength(slabel, 1, sequence.length, label);
      $(slabel).attr('title', title);
      this.registerTooltip(slabel);

      if (this.scale >= 8) {
        // draw Sequence text

        for (var s = 0; s < sequence.length; s++) {

          if ((s + 1) % 10 === 0) {
            svg.rect(bg, this.seq2Screen(s), y, 1 * this.scale, 10);
          } else if ((s + 1) % 5 === 0) {
            svg.rect(blg, this.seq2Screen(s), y, 1 * this.scale, 10);
          }

          var txt = svg.text(gs, this.seq2Screen(s) + 1, y +
            this.param.trackHeight - 1, this.viewer.getData().sequence.charAt(s));

          $(txt).attr('title', "Sequence position " +
            (s + 1) + " - " + this.viewer.getData().sequence.charAt(s));
          //$(rect).bind('mouseover', function(event,ui) {
          //popupTooltip(event,ui,$(this));});
          //$(rect).mouseout(function(event){hideTooltip();});
          this.registerTooltip(txt);
          //registerTooltip(rect);
          //$(txt).bind('click', function(event) {alert('sequence position: ' +(s+1) );});


        }
        y += this.param.trackHeight;
      }



      // extra spacer
      return y + 5;


    };


    /** draw a plus icon on the left side, that allows to expand the condensed view
     *
     * @param svg
     * @param y
     */
    Draw.prototype.drawExpandCondensedSymbol = function(svg, y, title, callback) {

      var g = svg.group({
        id: 'expandCondensed' + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });


      var arrowBody = svg.rect(g, (this.param.textLeft - 5), y + 1, 2, this.param.trackHeight - 2, {
        fill: 'black'
      });
      y += this.param.trackHeight;

      var arrow = svg.createPath();
      svg.path(g, arrow.move(this.param.textLeft - 4, y).line([
        [this.param.textLeft - 6, y - 4],
        [this.param.textLeft - 2, y - 4]
      ]).close(), {
        fill: 'black',
        stroke: 'black'
      });

      y += 1;

      var circle = svg.circle(g, this.param.textLeft - 4, y + this.param.trackHeight, 8, {
        fill: 'black',
        opacity: '0.2'
      });

      var text = svg.text(g, this.param.textLeft - 8, y + this.param.trackHeight * 1.5 - 1, "+", {
        fontSize: '14',
        fill: 'black',
        fontWeight: 'bold'
      });

      var mylist = [];

      mylist.push(circle);
      mylist.push(text);
      //mylist.push(arrow);
      mylist.push(arrowBody);


      for (var i = 0; i < mylist.length; i++) {

        var me = mylist[i];

        this.registerTooltip(me, title);

        $(me).bind('click', $.proxy(callback));
      }


      return y + this.param.trackHeight * 2 + 1;

    };

    /** draw a plus icon on the left side, that allows to expand the condensed view
     *
     * @param svg
     * @param y
     */
    Draw.prototype.drawCollapseCondensedSymbol = function(svg, y) {

      var g = svg.group({
        id: 'expandCondensed' + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });


      y += 1;

      var circle = svg.circle(g, this.param.textLeft - 4, y + this.param.trackHeight, 8, {
        fill: 'black',
        opacity: '0.2'
      });

      var text = svg.text(g, this.param.textLeft - 7, y + this.param.trackHeight * 1.5 - 1, "-", {
        fontSize: '14',
        fill: 'black',
        fontWeight: 'bold'
      });

      y += this.param.trackHeight * 2.5;

      var arrow = svg.createPath();
      svg.path(g, arrow.move(this.param.textLeft - 4, y - 4).line([
        [this.param.textLeft - 6, y],
        [this.param.textLeft - 2, y]
      ]).close(), {
        fill: 'black',
        stroke: 'black'
      });

      var arrowBody = svg.rect(g, (this.param.textLeft - 5), y, 2, this.param.trackHeight / 2, {
        fill: 'black'
      });

      var title = "Currently showing all PDB matches. Click here to show only representatives.";

      var mylist = [];

      mylist.push(circle);
      mylist.push(text);
      mylist.push(arrow);
      mylist.push(arrowBody);

      var that = this;
      var showCondensed = function() {
        that.viewer.setShowCondensed(true);
        $('#showCondensed').text("Show All");
      };

      for (var i = 0; i < mylist.length; i++) {

        var me = mylist[i];

        $(me).attr('title', title);
        this.registerTooltip(me);
        $(me).bind('click', showCondensed);

      }

      return y + this.param.trackHeight / 2 + 1;

    };

    Draw.prototype.drawSourceIndication = function(svg, name, topY, bottomY) {


      if (bottomY - topY < 2) {
        return;
      }

      var paired_colors = this.param.paired_colors;

      var color = this.param.paired_colors[5].color;

      var shortname = name;
      if (name.indexOf("Structural") > -1) {
        shortname = "SBKB";
      }

      if (name === 'UniProtKB') {
        color = paired_colors[2].darkercolor;
      } else if (name === "PDB" || name === "validation") {
        color = paired_colors[1].darkercolor;
      } else if (name === "Pfam") {
        color = paired_colors[6].color;
      } else if (name === "Calculated") {
        shortname = "Calc";
        name = "Electronic annotation";
        color = 'grey';
      } else if (name === "Domains") {
        shortname = " ";
        color = paired_colors[7].color;
      } else if (name === 'Exon') {
        color = paired_colors[8].color;
      } else if (name === 'Phospho') {
        color = paired_colors[9].color;
      }


      var g = this.getGroup(name + this.viewer.getData().uniprotID);
      $(g).attr('font-weight', 900);

      var rect = svg.rect(g, 11, topY, 10, bottomY - topY, {
        //fill: 'white',
        fill: color,
        stroke: color,
        strokeWidth: 1
      });

      var title = "Data from: " + name;
      $(rect).attr('title', title);
      this.registerTooltip(rect);

      //var rotStr = "rotate(-90, 1," + (bottomY - this.param.trackHeight  ) + ")";
      var rotStr = "rotate(-90,10," + (bottomY - this.param.trackHeight) + ")";
      var txt = svg.text(g, 2, bottomY - this.param.trackHeight + 10, shortname, {
        transform: rotStr,
        fill: 'black',
        'fill-opacity': '0.8'
      });
      $(txt).attr('title', title);
      this.registerTooltip(txt);

    };

    Draw.prototype.drawSeparator = function(svg, y) {


      var g = svg.group({
        id: 'separator',
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });
      svg.rect(g, this.param.textLeft, y + (this.param.trackHeight / 4),
        Math.round(this.viewer.getSequence().length * this.scale) + this.leftBorder + this.rightBorder,
        1, {
          //fill: 'white',
          fill: 'black',
          stroke: 'black',
          strokeWidth: 1
        }
      );

      return y + this.param.trackHeight;

    };


    ///
    Draw.prototype.drawGenericTrack = function(svg, rows, y, label, trackName,
      mycolors, url, callbackFunction, info) {

      if (typeof rows === 'undefined') {
        return y;
      }

      if (rows.length === 0) {
        return y;
      }

      var colorPos = 0;

      var g0 = this.getGroup(label + this.viewer.getData().uniprotID);

      this.drawName(svg, g0, y, label, undefined, info);


      nextRow:
        for (var j = 0; j < rows.length; j++) {

          var row = rows[j];

          if (typeof row === 'undefined') {
            continue;
          }



          // prepare the gradients for the colors:
          // gradients are always per-row of annotations.

          var groups = [];
          for (var c = 0; c < mycolors.length; c++) {

            var mcolor = mycolors[c];

            var defs = svg.defs();
            svg.linearGradient(defs, trackName + 'GR' + j + c + this.viewer.getData().uniprotID, [
                ['0%', 'white'],
                ['100%', mcolor.darkercolor]
              ],
              0, y, 0, y + this.param.trackHeight, {
                gradientUnits: 'userSpaceOnUse'

              }
            );

            // var mgroup = svg.group({
            //         id: trackName + this.viewer.getData().uniprotID,
            //         fontWeight: 'bold',
            //         fontSize: '10',
            //         fill: mcolor.textcolor
            //     }
            // );

            var mgroup = this.getGroup(trackName + this.viewer.getData().uniprotID);
            $(mgroup).attr('fill', mcolor.textcolor);

            groups[c] = mgroup;
          }



          nextInLine:
            for (var i = 0; i < row.length; i++) {

              try {
                var range = row[i];

                //                  // adjust for the fact that we start counting at 1
                //                  range.start;
                //                  range.end;

                if (typeof range.desc === 'undefined') {
                  continue nextInLine;
                }

                if (trackName.indexOf("scop") === -1) {

                  // we only do these checks if we are not rendering SCOP
                  // otherwise some scop domains have weird display


                  if (range.desc.indexOf('Cytoplasmic') > -1) {
                    this.drawCytoplasmic(y, svg, range, trackName);
                    continue nextInLine;
                  } else if (
                    (range.desc.indexOf('Periplasmic') > -1) ||
                    (range.desc.indexOf('Extracellular') > -1) ||
                    (range.desc.indexOf('Lumenal') > -1)
                  ) {
                    this.drawPeriplasmic(y, svg, range, trackName);
                    continue nextInLine;
                  } else if (range.name.indexOf('transmembrane') > -1) {
                    this.drawTransmembrane(y, svg, range, trackName);
                    continue nextInLine;
                  } else if (range.name.indexOf('intramembrane') > -1) {
                    this.drawIntramembrane(y, svg, range, trackName);
                    continue nextInLine;
                  }
                }

                colorPos++;
                if (colorPos >= mycolors.length) {
                  colorPos = 0;
                }

                var color = mycolors[colorPos];
                var g = groups[colorPos];

                var width = (range.end - range.start) + 1;

                var x1 = this.seq2Screen(range.start - 1);

                // get gradient name and group name
                var gradientName = trackName + 'GR' + j + colorPos + this.viewer.getData().uniprotID;


                var rect = svg.rect(g, x1, y, width * this.scale, this.param.trackHeight,
                  4, 4, {
                    fill: 'url(#' + gradientName + ')',
                    stroke: color.darkercolor,
                    strokeWidth: 1
                  });


                var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);



                this.checkTxtLength(txt, range.start, range.end, range.desc);


                var title = range.desc;
                if (range.desc !== range.name) {
                  title += "-" + range.name;
                }
                if (typeof range.status !== 'undefined') {
                  title += " - " + range.status;
                }


                $(rect).attr('title', title);
                this.registerTooltip(rect);

                $(txt).attr('title', title);
                this.registerTooltip(txt);


                if (typeof url !== 'undefined') {
                  $(rect).css('cursor', 'pointer');
                  $(txt).css('cursor', 'pointer');
                  $(rect).bind('click', this.newLocationMethod);
                  $(txt).bind('click', this.newLocationMethod);
                }


                if (typeof callbackFunction !== 'undefined') {
                  $(rect).css('cursor', 'pointer');
                  $(txt).css('cursor', 'pointer');
                  //$(rect).bind('click',
                  //function(event){callbackFunction(event,range);});
                  //$(txt).bind('click',
                  //function(event){callbackFunction(event,range);});
                  $(rect).bind('click', $.proxy(callbackFunction, this, range));
                  $(txt).bind('click', $.proxy(callbackFunction, this, range));
                }

              } catch (e) {
                alert("Problem while drawing generic track: " + label + " " + e);
                console.log(e);
              }
            }
          y += this.param.trackHeight + 5;
        }
      return y;

    };


    Draw.prototype.drawVariation = function(svg, y) {
      if (typeof this.viewer.getData().variation === 'undefined') {
        return y;
      }

      if (this.viewer.getData().variation.tracks.length < 1) {
        return y;
      }

      // mini space to keep distance to above.
      y += 7;

      var g = this.getGroup('variationTrackG' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, y, 'Variation', undefined, this.viewer.getData().variation.label);

      var siteTrackHeight = this.param.trackHeight + 5;

      var variationColors = new Array(1);
      variationColors[0] = this.param.paired_colors[3];

      this.drawSiteResidues(svg, this.viewer.getData().variation, y, 'upVariationTrack' +
        this.viewer.getData().uniprotID, variationColors, 'up', siteTrackHeight,
        this.popups.clickVariationMethod);

      return y + siteTrackHeight;

    };

    Draw.prototype.drawUPSites = function(svg, y) {


      if (typeof this.viewer.getData().upsites === 'undefined') {
        return y;
      }

      if (this.viewer.getData().upsites.tracks.length < 1) {
        return y;
      }

      // mini space to keep distance to above.
      y += 2;

      // var g = svg.group({
      //         id: 'upsitesTrackG' + this.viewer.getData().uniprotID,
      //         fontWeight: 'bold',
      //         fontSize: '10', fill: 'black'
      //     }
      // );

      var g = this.getGroup('upsitesTrackG' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, y, 'UP Sites', undefined, this.viewer.getData().upsites.label);

      var siteTrackHeight = this.param.trackHeight + 5;

      this.drawSiteResidues(svg, this.viewer.getData().upsites, y, 'upsitesTrack' +
        this.viewer.getData().uniprotID, this.param.paired_colors, 'up', siteTrackHeight,
        this.popups.clickUpSiteMethod);

      return y + siteTrackHeight;

    };

    Draw.prototype.drawPhosphoSites = function(svg, y) {


      if (typeof this.viewer.getData().phospho === 'undefined') {

        return y;
      }

      if (this.viewer.getData().phospho.tracks.length < 1) {

        return y;
      }

      y = y + 5;

      var g = this.getGroup('phosphositesTrackG' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, (y + this.param.trackHeight), 'Phosphosite', undefined,
        this.viewer.getData().phospho.label);

      var siteTrackHeight = this.param.trackHeight + 5;

      this.drawSiteResidues(svg, this.viewer.getData().phospho, y, 'phosphositesTrack' +
        this.viewer.getData().uniprotID, this.param.paired_colors,
        'up', siteTrackHeight, this.popups.clickPhosphoMethod);

      return y + siteTrackHeight + 22;


    };

    Draw.prototype.drawPDBSites = function(svg, y) {


      if (typeof this.viewer.getData().pdbsites === 'undefined') {
        return y;
      }

      if (this.viewer.getData().pdbsites.tracks.length < 1) {
        return y;
      }


      var g = this.getGroup('sitesTrackG' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, y, 'PDB Sites', undefined, this.viewer.getData().pdbsites.label);

      var siteTrackHeight = this.param.trackHeight + 5;

      this.drawSiteResidues(svg, this.viewer.getData().pdbsites, y, 'sitesTrack' +
        this.viewer.getData().uniprotID, this.param.paired_colors, 'down', siteTrackHeight);

      return y + siteTrackHeight + 2;

    };


    Draw.prototype.drawRSRZOutlier = function(svg, g, site, sequence, y) {


      var baseLineHeight = this.param.baseLineHeight;
      var siteTrackHeight = this.param.trackHeight + 5;

      var validationRed = this.param.paired_colors[5];

      var rect = svg.rect(g, this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight,
        2, siteTrackHeight - baseLineHeight, {
          fill: 'black'
        });

      var circle = svg.circle(g, this.seq2Screen(site.start) - this.scale / 2, y, 4, {
        fill: validationRed.color,
        stroke: validationRed.darkerColor,
        strokeWidth: 1
      });

      var title = "Poor fit to the electron density (RSRZ > 2) chain " +
        site.chainID + " PDB residue: " + site.pdbStart;

      $(rect).attr("title", title);
      $(circle).attr("title", title);
      this.registerTooltip(rect);
      this.registerTooltip(circle);

    };

    Draw.prototype.drawPDBValidation = function(svg, sequence, y) {


      if (typeof this.viewer.getData().validation === 'undefined') {

        return y;
      }

      if (this.viewer.getData().validation.tracks.length < 1) {
        return y;
      }


      var trackName = "validationReport";

      var g = this.getGroup('validationTrackG' + this.viewer.getData().uniprotID);

      var defs2 = svg.defs();

      // init the gradients for the validation colors.

      var ctmp = this.param.paired_colors[5].color;
      var validationRed = colors.rgb.hex2rgb(ctmp);


      var validationColors = [
        colors.forceRGB('darkgreen'),
        colors.forceRGB('yellow'),
        colors.forceRGB('orange'),
        validationRed
      ];


      for (var i = 0; i < validationColors.length; i++) {

        var validationColor = validationColors[i];

        var finalValCol = colors.rgb.rgb2hex(validationColor);

        // var validationColorLight = colors.shadeRGBColor(validationColor,90);


        var gradientName = trackName + 'GR' + i + this.viewer.getData().uniprotID;

        svg.linearGradient(defs2, gradientName, [
            ['0%', finalValCol],
            ['50%', finalValCol],
            ['100%', finalValCol]
          ],
          0, y, 0, y + this.param.trackHeight, {
            gradientUnits: 'userSpaceOnUse'

          }
        );
      }

      // end of init default gradients.



      this.drawName(svg, g, y, 'PDB Validation', undefined, this.viewer.getData().validation.label);

      var validationTrackHeight = this.param.trackHeight + 5;

      var tracks = this.viewer.getData().validation.tracks;


      for (var s = 0; s < tracks.length; s++) {

        var valid = tracks[s];

        if (valid.name === 'poorFit') {

          continue;
        }

        valid.desc = parseInt(valid.desc);

        if (valid.desc > 3) {
          valid.desc = 3;
        }


        var myGradientName = trackName + 'GR' + valid.desc + this.viewer.getData().uniprotID;

        var seqPos = valid.start - 1;


        // var vc = validationColors[valid.desc];

        // var fvc = colors.rgb.rgb2hex(vc);

        var rect = svg.rect(this.seq2Screen(seqPos), y + 5,
          1 * this.scale + 1, this.param.trackHeight, {
            fill: 'url(#' + myGradientName + ')'

          });

        // draw line at bottom to wrap up
        svg.rect(this.seq2Screen(seqPos), y + validationTrackHeight,
          1 * this.scale + 1, 1, {
            fill: 'black'

          });

        var title = valid.desc + " problem(s) for " + valid.pdbID + " residue " + valid.pdbStart +
          "  in chain " + valid.chainID;

        $(rect).attr("title", title);
        this.registerTooltip(rect);


      }



      var outlierG = svg.group({
        id: 'validationTrackOutlierG' + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });


      // in a second loop, draw the outliers, so they are always "on top"
      for (var s2 = 0; s2 < tracks.length; s2++) {

        var validt = tracks[s2];

        if (validt.name === 'poorFit') {
          this.drawRSRZOutlier(svg, outlierG, validt, sequence, y);

        }
      }

      console.log("returning " + (y + validationTrackHeight + 2));
      return y + validationTrackHeight + 2;

    };

    Draw.prototype.drawSCOP = function(svg, sequence, y) {

      if (typeof this.viewer.getData().scop === 'undefined') {
        return y;
      }

      var trackrows = this.breakTrackInRows(this.viewer.getData().scop.tracks);

      //console.log("SCOP trackrows: " + trackrows);

      y = this.drawGenericTrack(svg, trackrows, y, 'SCOP domains',
        'scopDomains', colors.rgb.getDomainColors(), undefined,
        this.popups.scopcallback, this.viewer.getData().scop.label);

      if (typeof this.viewer.getData().scope === 'undefined') {
        return y;
      }




      var trackrowsE = this.breakTrackInRows(this.viewer.getData().scope.tracks);
      //console.log("Draw scope: " + JSON.stringify(trackrowsE));
      y = this.drawGenericTrack(svg, trackrowsE, y, 'SCOPe domains',
        'scopeDomains', colors.rgb.getDomainColors(), undefined, this.popups.scopecallback,
        this.viewer.getData().scope.label);


      return y;

    };


    Draw.prototype.drawExons = function(svg, sequence, y) {

      if (typeof this.viewer.getData().exon === 'undefined') {
        return y;
      }

      if (this.viewer.getData().exon.tracks.length < 1) {
        return y;
      }


      y += 5;

      var exonTrackHeight = this.param.trackHeight;

      var g = this.getGroup('exonTrack' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, y, "Exon Structure", undefined, this.viewer.getData().exon.label);

      for (var i = 0; i < this.viewer.getData().exon.tracks.length; i++) {


        var domainOrig = this.viewer.getData().exon.tracks[i];


        // var domainOrig =this.viewer.getData().exon.tracks[i];

        var domain = {};
        domain.start = domainOrig.start;
        domain.end = domainOrig.end;
        domain.name = domainOrig.name;
        domain.desc = domainOrig.desc;

        var x1 = this.seq2Screen(domain.start - 1);
        var length = domain.end - domain.start + 1;


        var color = this.param.paired_colors[8];

        var defs = svg.defs();

        // var g2 = svg.group({
        //     id: 'exon' + i, fontWeight: 'bold',
        //     fontSize: '10', fill: 'black'
        // });

        var g2 = this.getGroup('exon' + i);


        if (i % 2 === 0) {
          svg.linearGradient(defs, 'exon' + i, [
              ['0%', 'white'],
              ['100%', color.color]
            ],
            0, y, 0, y + exonTrackHeight, {
              gradientUnits: 'userSpaceOnUse'

            }
          );

        } else {
          svg.linearGradient(defs, 'exon' + i, [
              ['0%', color.color],
              ['100%', 'white']
            ],
            0, y, 0, y + exonTrackHeight, {
              gradientUnits: 'userSpaceOnUse'
            }
          );
        }

        var rect = svg.rect(g2, x1, y, length * this.scale, exonTrackHeight,
          0, 0, {
            //fill: 'white',
            fill: 'url(#exon' + i + ')',
            stroke: color.darkercolor,
            strokeWidth: 1
          }
        );


        var title = "Exon Structure " + domain.name + " - " + domain.desc;

        $(rect).attr("title", title);

        //var length = tooltip.getComputedTextLength();

        var txt = svg.text(g2, x1 + this.scale, y + this.param.trackHeight - 1,
          domain.name + " - " + domain.desc);


        this.checkTxtLength(txt, domain.start, domain.end, domain.name);

        this.registerTooltip(rect);


        $(txt).attr("title", "Exon Structure " + domain.name + " - " + domain.desc);
        this.registerTooltip(txt);
      }


      return y + 2 * this.height;


    };

    Draw.prototype.drawJronn = function(svg, sequence, y) {


      if (typeof this.viewer.getData().jronn === 'undefined') {
        return y;
      }


      //alert(JSON.stringify(data.jronn));
      var g = this.getGroup('disorder' + this.viewer.getData().uniprotID);
      this.drawName(svg, g, y + this.param.trackHeight, 'Disorder', undefined, this.viewer.getData().jronn.label);

      //var min = parseFloat(data.jronn_min);
      //var max = parseFloat(data.jronn_max);
      // JRONN is always between 0 and 1, can ignore the provided min and max...
      var min = 0;
      var max = 1;
      //var min = 0;
      //var max = 0.8;
      //alert (min + " " + max);
      var adjustedSize = parseFloat(max + Math.abs(min));

      var heightScale = (this.param.trackHeightCharts - 2) / adjustedSize;

      var red = this.param.paired_colors[5];
      var blue = this.param.paired_colors[1];

      //alert(heightScale + " " + adjustedSize);
      for (var s = 0; s < sequence.length; s++) {

        var jronpos = this.viewer.getData().jronn.tracks[s];
        if (typeof jronpos === 'undefined') {
          //alert("jronpos undef " + s);
          continue;
        }

        var val = Math.abs(parseFloat(jronpos.desc));
        var score = val;

        if (val >= 0) {
          score += Math.abs(min);
        }

        var posHeight = Math.abs(score) * heightScale;
        // max = y;
        // 0 == trackHeight/2;
        // min = y+trackHeight;
        var col = blue.color;
        if (val > 0.5) {
          col = red.darkercolor;
        }


        var tmph = posHeight;
        if (tmph < 0) {
          console.log(s + " score: " + score + " orig: " + jronpos.desc + " tmph:" +
            tmph + " posH: " + posHeight + " totalH:" + this.param.trackHeightCharts);
        }


        svg.rect(this.seq2Screen(s), y - posHeight + this.param.trackHeightCharts - 2, 1 * this.scale + 1, tmph, {
          fill: col
        });

      }

      //  svg.rect(g,seq2Screen(0), y -( 0.5+min) * heightScale +
      //trackHeightCharts,sequence.length * scale, 1,{fill: 'black'});

      return y + this.param.trackHeightCharts;

    };

    /** Draw the hydropathy of the sequence
     *
     * @param svg
     * @param sequence
     * @param y
     */
    Draw.prototype.drawHydropathy = function(svg, sequence, y) {

      if (typeof this.viewer.getData().hydropathy === 'undefined') {
        return y;
      }

      var red = this.param.paired_colors[5];
      var blue = this.param.paired_colors[1];

      var g = this.getGroup('hydropathy' + this.viewer.getData().uniprotID);

      this.drawName(svg, g, y + this.param.trackHeight, 'Hydropathy',
        undefined, this.viewer.getData().hydropathy.label);

      // this line represents a score of 0;
      svg.rect(g, this.seq2Screen(0), y + this.param.trackHeightCharts / 2,
        sequence.length * this.scale, 1, {
          fill: 'black'
        });

      var min = parseFloat(this.viewer.getData().hydropathy_min);
      var max = parseFloat(this.viewer.getData().hydropathy_max);
      var adjustedSize = (max + Math.abs(min));

      var heightScale = this.param.trackHeightCharts / adjustedSize;
      //alert(heightScale + " " + adjustedSize);
      for (var s = 0; s < sequence.length; s++) {

        var hydro = this.viewer.getData().hydropathy.tracks[s];
        if (typeof hydro === 'undefined') {
          continue;
        }
        var val = parseFloat(hydro.desc);

        var score = parseFloat(hydro.desc);

        if (val > 0) {
          score += Math.abs(min);
        }

        var posHeight = Math.abs(score * heightScale);
        // max = y;
        // 0 == trackHeight/2;
        // min = y+trackHeight;
        if (val < 0) {
          svg.rect(this.seq2Screen(s), y + this.param.trackHeightCharts / 2, 1 * this.scale + 1, posHeight, {
            fill: blue.color
          });
        } else {
          var tmp = posHeight - this.param.trackHeightCharts / 2;
          if (tmp < 0) {
            tmp = 0;
          }
          svg.rect(this.seq2Screen(s), y - posHeight + this.param.trackHeightCharts, 1 * this.scale + 1, tmp, {
            fill: red.color
          });
        }

      }

      return y + this.param.trackHeightCharts + this.param.trackHeight / 2;

    };

    /** Draw the hydropathy of the sequence
     *
     * @param svg
     * @param sequence
     * @param y
     */
    Draw.prototype.drawSignalP = function(svg, sequence, y) {

      if (typeof this.viewer.getData().signalp === 'undefined') {
        return y;
      }


      y = this.drawGenericTrack(svg, this.viewer.getData().signalp, y, 'SignalP',
        'signalP', this.param.up_colors, undefined, this.callback, this.viewer.getData().signalp.label);

    };

    Draw.prototype.drawSelection = function(svg, bottomY) {

      if (this.viewer.selectionStart < 0) {
        return;
      }

      if ( typeof bottomY ==='undefined'){
        bottomY = this.maxY;
      }

      var topY = 0;

      var g = svg.group({
        id: 'selection' + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        border: this.param.paired_colors[6].color,
        fill: 'white',
        'fill-opacity': '0'
      });


      var length = (this.viewer.selectionEnd - this.viewer.selectionStart + 1);

      //console.log("selection:" + this.viewer.selectionStart + " - " + this.selectionEnd);

      var rect = svg.rect(g, this.seq2Screen(this.viewer.selectionStart), topY, length * this.scale, bottomY,
        0, 0, {
          //                fill: 'url(#selection' +this.viewer.getData().uniprotID + ')',
          stroke: this.param.paired_colors[5].lightercolor,
          strokeWidth: 1,
          style: '/* rule 1 */ use { fill-opacity: .5 } '
        });

      //TODO: in principle this shows a tooltip, but the positioning if off...
      $(rect).attr("data-toggle", "tooltip");
      $(rect).attr("data-placement", "top");
      $(rect).attr("data-container", "body");
      $(rect).attr("title", "selection: " + this.viewer.selectionStart + "-" + this.viewer.selectionEnd);
      $(rect).text("selection: " + this.viewer.selectionStart + "-" + this.viewer.selectionEnd);
      $(rect).tooltip();



    };

    Draw.prototype.drawPfam = function(svg, y) {


      if (typeof this.viewer.getData().pfam === 'undefined') {
        return y;
      }

      if (this.viewer.getData().pfam.tracks.length < 1) {
        return y;
      }

      y += 5;

      var pfamTrackHeight = this.param.trackHeight;

      var g = this.getGroup('pfamTrack' + this.viewer.getData().uniprotID);
      this.drawName(svg, g, y, "Pfam", undefined, this.viewer.getData().pfam.label);

      for (var i = 0; i < this.viewer.getData().pfam.tracks.length; i++) {

        var domainOrig = this.viewer.getData().pfam.tracks[i];

        var domain = {};
        domain.start = domainOrig.start - 1;
        domain.end = domainOrig.end - 1;
        domain.name = domainOrig.name;
        domain.desc = domainOrig.desc;

        var x1 = this.seq2Screen(domain.start);
        var length = domain.end - domain.start + 1;

        //          var colorPos = i ;
        //          if ( i > bw_colors.length -1 )
        //          colorPos = i% bw_colors.length;


        //var color = bw_colors[colorPos];
        var color = this.param.paired_colors[6];

        var defs = svg.defs();

        // var g2 = svg.group({
        //     id: 'pfam' + i, fontWeight: 'bold',
        //     fontSize: '10', fill: color.textcolor
        // });

        var g2 = this.getGroup('pfam' + i);
        $(g2).attr('fill', color.textcolor);

        svg.linearGradient(defs, 'pfam' + i, [
            ['0%', color.lightercolor],
            ['100%', color.darkercolor]
          ],
          0, y, 0, y + pfamTrackHeight, {
            gradientUnits: 'userSpaceOnUse'

          }
        );

        var rect = svg.rect(g2, x1, y, length * this.scale, pfamTrackHeight,
          3, 3, {
            //fill: 'white',
            fill: 'url(#pfam' + i + ')',
            stroke: color.darkercolor,
            strokeWidth: 1
          }
        );

        //$(rect).css('class','tooltip');


        var title = "Pfam Domain " + domain.name + " - " + domain.desc;

        $(rect).attr("title", title);

        //var length = tooltip.getComputedTextLength();

        var txt = svg.text(g2, x1 + this.scale, y + this.param.trackHeight - 1,
          domain.name + " - " + domain.desc);


        this.checkTxtLength(txt, domain.start, domain.end, domain.name);

        this.registerTooltip(rect);


        $(txt).attr("title", "Pfam Domain " + domain.name + " - " + domain.desc);
        this.registerTooltip(txt);

      }

      return y + this.height + 5;

    };


    Draw.prototype.highlightTrack = function(svg, track, y, trackID) {

      if (track === null) {
        return y;
      }

      var g = this.getGroup(trackID);

      var width = this.viewer.getData().length;

      svg.rect(g, 0, y,
        this.param.leftBorder + Math.round(width * this.scale) + this.param.rightBorder, this.param.trackHeight, {
          fill: 'lightgrey',
          stroke: 'lightgrey',
          strokeWidth: 1
        });

    };

    Draw.prototype.draw3dFlagForTrack = function(svg, track, y) {

      if (track === null) {
        return y;
      }

      // console.log("showing track in 3D:" + trackID + " " + track.pdbID);

      var trnsfrm = "matrix(1,0,0,-1,0," + (y + this.param.trackHeight) + ") scale(0.005)";

      var g1 = svg.group({
        transform: trnsfrm
      });

      svg.path(g1, this.icons.eye, {});

      $(g1).attr("title", "Shown in 3D viewer");

      this.registerTooltip(g1);

    };

    Draw.prototype.drawTrack = function(svg, track, y, trackID) {

      if (track === null) {
        return y;
      }


      /// console.log("drawing track " + JSON.stringify(track) + " " + y);

      // first some parameters for this view

      //var g = svg.group({id: trackID, fontWeight: 'bold', fontSize: '10', fill: 'black'});
      var g = this.getGroup(trackID);

      var seqG = this.getGroup(trackID);

      $(seqG).attr('font-family', 'Helvetica, Arial, sans-serif');
      $(seqG).attr('font-weight', 'bold');

      var mismatchGroup = svg.group({
        id: 'sMM' + trackID + this.viewer.getData().uniprotID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: this.param.paired_colors[5].color
      });

      var seqresGroup = svg.group({
        id: 'seqres' + trackID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });

      var color = track.color;
      var bw_color = this.param.bw_colors[6];
      var mismatch_color = this.param.paired_colors[4];

      var defs = svg.defs();

      svg.linearGradient(defs, 'MyGradient' + trackID + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', color]
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'
        }
      );

      svg.linearGradient(defs, 'BWGradient' + trackID + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', bw_color.color]
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'

        }
      );

      svg.linearGradient(defs, 'BWLightGradient' + trackID + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', 'grey']
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'

        }
      );

      svg.linearGradient(defs, 'MISMGradient' + trackID + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', mismatch_color.color]
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'

        }
      );


      // now drawing the track

      this.drawName(svg, g, y, track.pdbID + "." + track.chainID,
        undefined, "Track for PDB ID " + track.pdbID +
        " chain ID " + track.chainID);

      for (var i = 0; i < track.ranges.length; i++) {
        var rangeOrig = track.ranges[i];

        var range = {};
        range.start = rangeOrig.start - 1;
        range.end = rangeOrig.end - 1;
        range.observed = rangeOrig.observed;
        range.mismatch = rangeOrig.mismatch;

        var width = (range.end - range.start) + 1;

        var r1 = this.param.trackHeight / 2 - 1;
        var r2 = this.param.trackHeight / 2 - 1;

        if (range.observed) {

          if (range.mismatch) {

            var rect1 = svg.rect(g, this.seq2Screen(range.start), y,
              Math.round(width * this.scale), this.param.trackHeight, {
                fill: 'url(#MISMGradient' + trackID + this.viewer.getData().uniprotID + ')',
                stroke: mismatch_color.darkercolor,
                strokeWidth: 1
              });


            var txt = " (sequence position: " + rangeOrig.start;
            if (rangeOrig.start !== rangeOrig.end) {
              txt += " - " + rangeOrig.end;
            }
            txt += ") ";

            if (typeof rangeOrig.pdbStart !== 'undefined') {
              txt += '(PDB residue:' + rangeOrig.pdbStart;
              if (rangeOrig.pdbStart !== rangeOrig.pdbEnd) {
                txt += '-' + rangeOrig.pdbEnd;
              }
              txt += ") ";
            }

            var aa = "";

            if (typeof rangeOrig.pdbResidue !== 'undefined') {
              aa = rangeOrig.pdbResidue;
            }


            var mmtitle = "Mismatch " +
              this.viewer.getData().sequence.charAt(range.start) +
              "->" + aa +
              " between PDB and UniProt residue " + txt;

            $(rect1).attr("title", mmtitle);

            this.registerTooltip(rect1);

            if (this.scale > 8) {


              // this gives the UP sequence, but here is a mismatch
              // this.viewer.getData().sequence.charAt(s)
              // need to show the PDB sequence...



              var txtm = svg.text(mismatchGroup, this.seq2Screen(range.start) + 1, y +
                this.param.trackHeight - 1, aa);
              $(txtm).attr("title", mmtitle);
              this.registerTooltip(txtm);

            }

          } else {

            var rect = svg.rect(g, this.seq2Screen(range.start), y,
              Math.round(width * this.scale), this.param.trackHeight,
              r1, r2, {
                fill: 'url(#MyGradient' + trackID + this.viewer.getData().uniprotID + ')',
                stroke: color,
                strokeWidth: 1
              });

            var resolution = "";
            if (typeof track.resolution !== 'undefined') {
              resolution = " - " + (track.resolution / 1000) + " " + '\u00C5';
            }
            var d = new Date(track.releaseDate);

            var title = "PDB ID " + track.pdbID + " chain " +
              track.chainID + " - " +
              track.desc + " (sequence position: " + rangeOrig.start + "-" + rangeOrig.end + ") ";
            if (typeof rangeOrig.pdbStart !== 'undefined') {
              title += '(PDB residue: ' + rangeOrig.pdbStart;

              if (rangeOrig.pdbEnd !== rangeOrig.pdbStart) {
                title += '-' + rangeOrig.pdbEnd;
              }
              title += ") ";
            }
            title += resolution + " - " + d.toDateString();


            $(rect).attr("title", title);

            this.registerTooltip(rect);

            if (this.scale > 8) {


              for (var s1 = range.start; s1 <= range.end; s1++) {

                // this gives the UP sequence, but here is a mismatch
                // this.viewer.getData().sequence.charAt(s)
                // need to show the PDB sequence...
                var aam = this.viewer.getData().sequence.charAt(s1);

                svg.text(seqG, this.seq2Screen(s1) + 1, y +
                  this.param.trackHeight - 1, aam);

                //todo: add tooltip for text here?

              }

            }

          }
        } else {

          // shows SEQRES that are not in ATOM records.

          if (this.viewer.getShowSeqres()) {

            var mg = g;

            var seqresY = (this.param.trackHeight / 4);
            var seqresHeight = (this.param.trackHeight / 4) * 2;
            var gradient = 'url(#BWGradient';
            if (this.scale > 8) {
              mg = seqresGroup;
              seqresY = 0;
              seqresHeight = this.param.trackHeight;
              gradient = 'url(#BWLightGradient';

            }


            var line = svg.rect(mg, this.seq2Screen(range.start), y + seqresY,
              Math.round(width * this.scale), seqresHeight,

              {
                fill: gradient + trackID + this.viewer.getData().uniprotID + ')',
                stroke: bw_color.color,
                strokeWidth: 1
              });


            $(line).attr("title", "No coordinates have been " +
              "determined for region (" + range.start + "-" + range.end + "), " +
              "but the sequence is recorded in the SEQRES records. ");

            this.registerTooltip(line);

            if (this.scale > 8) {

              for (var s3 = range.start; s3 <= range.end; s3++) {

                // this gives the UP sequence, but here is a mismatch
                // this.viewer.getData().sequence.charAt(s)
                // need to show the PDB sequence...
                var aas = this.viewer.getData().sequence.charAt(s3).toLowerCase();

                svg.text(mg, this.seq2Screen(s3) + 2, y +
                  this.param.trackHeight - 1, aas);

                //todo: add tooltip for text here?
              }


            }
          }
        }
      }


      if (typeof track.seqdiff !== 'undefined') {
        this.drawSeqDiff(svg, track, y, trackID);
      }


      return y + this.height;

    };


    /** Provides more detailed info about sequence mismatches
     */
    Draw.prototype.drawSeqDiff = function(svg, track, y, trackID) {

      if (typeof track.seqdiff === 'undefined') {
        return;
      }

      if (track.seqdiff.length < 1) {
        return;
      }

      var colorPos = 0;
      var mycolors = this.param.up_colors;

      var siteTrackHeight = this.param.trackHeight;
      var baseLineHeight = this.param.baseLineHeight;

      var g = svg.group({
        id: trackID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });



      for (var i = 0; i < track.seqdiff.length; i++) {
        // draw a tick..

        var feature = track.seqdiff[i];

        if (typeof feature.uniprot !== 'undefined' && (feature.uniprot !== this.viewer.getData().uniprotID)) {
          // this is an issue for fusion proteins, where a PDB chain can map
          // to more than one UniProt entry.
          continue;
        }


        var detail = "";
        var title = "";
        if (typeof feature.detail !== 'undefined') {

          detail = feature.detail.toUpperCase();
          title = feature.detail;
        }

        var color = colorDict[detail];

        if (typeof feature.aa !== 'undefined') {
          title += ' ' + feature.aa;
        }
        title += ' at ' + feature.pdbID + "." + feature.chainID + ' PDB residue:' +
          feature.pdbStart + ' sequence position: ' + feature.start;

        title += " " + feature.uniprot;

        if (detail === 'CONFLICT') {
          color = this.param.conflictColor;
        }

        var shortText = "";
        var fontSize = 8;
        var xCorrection = -3;
        var yCorrection = 0;
        var shape = 'circle';

        if (detail.indexOf('MODIFIED') === 0) {
          shortText = feature.aa;
          fontSize = 6;
          xCorrection = -6;
        } else if (detail.indexOf('MICROHETEROGENEITY') === 0) {
          shortText = '<>';
          fontSize = 6;
          xCorrection = -4;
          yCorrection = -1;
        } else if (detail.indexOf('CLONING') === 0) {
          shortText = "C";
        } else if (detail.indexOf('GAP') === 0) {
          shortText = "";
          shape = 'triangle';
        } else if (detail.indexOf('INITIAL METH') === 0) {
          shortText = feature.aa;
          xCorrection = -6;
          fontSize = 6;
        } else if (detail.indexOf('CHROMOPHORE') === 0) {
          shortText = feature.aa;
          fontSize = 6;
          xCorrection = -6;
        } else if (detail.indexOf('ENGINEERED') === 0) {
          shortText = "E";
        } else if (detail.indexOf('MUTATION') > -1) {
          shortText = "M";
        } else if (detail.indexOf(' TAG') > -1) {
          shortText = "T";
          color = this.param.expressionTagColor;

        } else if (detail.indexOf('DELETION') > -1) {
          shortText = "";
          shape = 'triangle';
          color = this.param.deletionColor;
        } else if (detail.indexOf('INSERTION') > -1) {
          shortText = "";
          shape = 'triangle-up';
          color = this.param.deletionColor;
        }


        if (typeof color === 'undefined') {
          colorPos++;
          if (colorPos > mycolors.length - 1) {
            colorPos = 0;
          }
          color = mycolors[colorPos];
          colorDict[detail] = color;

        }

        //console.log("setting color for " + detail + " " + color.darkercolor);

        var xpos = this.seq2Screen(feature.start) - this.scale / 2;

        // if ( this.scale > 8 ) {
        //     xpos = this.seq2Screen(feature.start) ;
        // }

        svg.radialGradient(g, 'seqDiffGradient' + i + this.viewer.getData().uniprotID, [
            ['0%', color.lightercolor],
            ['100%', color.color]
          ],
          //0,y,0, y+ trackHeight,
          xpos, y + baseLineHeight - 4, 4,
          xpos, y + baseLineHeight - 3, {
            gradientUnits: 'userSpaceOnUse'

          }
        );



        if (shape === 'triangle') {

          xpos = this.seq2Screen(feature.start) + this.scale / 2;

          var w2 = this.scale / 2;
          var tri = svg.polygon(g, [
            [xpos - w2, y - baseLineHeight],
            [xpos + 1, y + baseLineHeight + 2],
            [xpos + w2 + 1, y - baseLineHeight]
          ], {
            fill: 'url(#seqDiffGradient' + i + this.viewer.getData().uniprotID + ')',
            stroke: color.darkerColor,
            strokeWidth: 1
          });
          $(tri).attr("title", title);
          this.registerTooltip(tri);

        } else if (shape === 'triangle-up') {

          xpos = this.seq2Screen(feature.start) + this.scale / 2;

          var w3 = this.scale / 2;
          var tru = svg.polygon(g, [
            [xpos - w3, y + baseLineHeight + 2],
            [xpos + 1, y - baseLineHeight],
            [xpos + w3 + 1, y + baseLineHeight + 2]
          ], {
            fill: 'url(#seqDiffGradient' + i + this.viewer.getData().uniprotID + ')',
            stroke: color.darkerColor,
            strokeWidth: 1
          });
          $(tru).attr("title", title);
          this.registerTooltip(tru);

        } else {

          var circle = svg.circle(g, xpos, y, 4, {
            fill: 'url(#seqDiffGradient' + i + this.viewer.getData().uniprotID + ')',
            stroke: color.darkerColor,
            strokeWidth: 1
          });
          $(circle).attr("title", title);
          this.registerTooltip(circle);




        }

        var rect = svg.rect(g, xpos, y + baseLineHeight,
          2, siteTrackHeight - baseLineHeight, {
            fill: 'black'
          });
        $(rect).attr("title", title);
        this.registerTooltip(rect);


        if (shortText.length > 0) {

          // draw a tiny E...

          var txt = svg.text(g, xpos + xCorrection, y + yCorrection + siteTrackHeight / 4,
            shortText, {
              'font-size': fontSize
            });
          $(txt).attr("title", title);
          this.registerTooltip(txt);

        }







      }


    };


    /** Draws Site residues.
     *
     * @param svg
     * @param track
     * @param y
     * @param trackID
     * @param mycolors
     * @param orientation - should the site-arrows point upwards or downwards? either 'up' or 'down'
     * @param siteTrackHeight
     * @param modalFunction (optional) used to show a modal window if user clicks on track
     */
    Draw.prototype.drawSiteResidues = function(svg, feature, y, trackID,
      mycolors, orientation, siteTrackHeight,
      modalFunction) {


      if (typeof feature.tracks === 'undefined') {
        return;
      }

      if (feature.tracks.length < 1) {
        return;
      }

      var baseLineHeight = this.param.baseLineHeight;

      var colorPos = 0;
      var g = svg.group({
        id: trackID,
        fontWeight: 'bold',
        fontSize: '10',
        fill: 'black'
      });

      // draw features base line...
      var defs1 = svg.defs();

      var isPhospho = false;
      // color gradient of base line. Default .. UP color
      var gcolor = this.param.paired_colors[2];
      if (feature.label === 'PDB SITES residues') {
        // PDB color...
        gcolor = this.param.paired_colors[1];
      } else if (feature.label.indexOf('Phosphosite') !== -1) {
        gcolor = this.param.paired_colors[9];
        isPhospho = true;
      }

      var rect1 = {};

      if (orientation === 'up') {

        svg.linearGradient(defs1, 'sequenceSite' + trackID + this.viewer.getData().uniprotID, [
            ['0%', gcolor.color],
            ['100%', gcolor.darkercolor]
          ],
          0, y + siteTrackHeight - baseLineHeight, 0, y + siteTrackHeight, {
            gradientUnits: 'userSpaceOnUse'

          }
        );
        rect1 = svg.rect(g, this.seq2Screen(0), y + siteTrackHeight - baseLineHeight,
          this.viewer.getSequence().length * this.scale, baseLineHeight,
          4, 4, {
            fill: 'url(#sequenceSite' + trackID + this.viewer.getData().uniprotID + ')',
            stroke: gcolor.darkercolor,
            strokeWidth: 1
          });
      } else {
        svg.linearGradient(defs1, 'sequenceSite' + trackID + this.viewer.getData().uniprotID, [
            ['0%', gcolor.color],
            ['100%', gcolor.darkercolor]
          ],
          0, y, 0, y + baseLineHeight, {
            gradientUnits: 'userSpaceOnUse'

          }
        );

        rect1 = svg.rect(g, this.seq2Screen(0), y,
          this.viewer.getSequence().length * this.scale, baseLineHeight,
          4, 4, {
            fill: 'url(#sequenceSite' + trackID + this.viewer.getData().uniprotID + ')',
            stroke: gcolor.darkercolor,
            strokeWidth: 1
          });
      }


      $(rect1).attr("title", feature.label + ' track for ' +
        feature.tracks[0].pdbID + "." + feature.tracks[0].chainID);
      this.registerTooltip(rect1);


      for (var i = 0; i < feature.tracks.length; i++) {
        var site = feature.tracks[i];
        if (typeof site === 'undefined') {
          continue;
        }

        var color = colorDict[site.name];


        if (feature.label === "wwPDB validation report data") {
          // PDB validation records.
          // the color code is int the desc field

          var defcolor = site.desc;

          color = defcolor;
        }


        if (typeof color === 'undefined') {
          colorPos++;
          if (colorPos > mycolors.length - 1) {
            colorPos = 0;
          }
          color = mycolors[colorPos];
          colorDict[site.name] = color;
          //console.log("setting new color for " + site.name + " " + color.color);
        }


        if (orientation === 'up') {
          svg.radialGradient(g, 'siteWGradient' + i + this.viewer.getData().uniprotID, [
              ['0%', color.lightercolor],
              ['100%', color.color]
            ],
            //0,y,0, y+ trackHeight,
            this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight - 4, 4,
            this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight - 3, {
              gradientUnits: 'userSpaceOnUse'

            }
          );
        } else {
          svg.radialGradient(g, 'siteWGradient' + i + this.viewer.getData().uniprotID, [
              ['0%', color.lightercolor],
              ['100%', color.color]
            ],
            //0,y,0, y+ trackHeight,
            this.seq2Screen(site.start) - this.scale / 2, y + siteTrackHeight - 4, 4,
            this.seq2Screen(site.start) - this.scale / 2, y + siteTrackHeight - 3, {
              gradientUnits: 'userSpaceOnUse'

            }
          );
        }

        //

        var rect = {};
        var circle = {};

        if (orientation === 'up') {
          rect = svg.rect(g, this.seq2Screen(site.start) - this.scale / 2, y + baseLineHeight,
            2, siteTrackHeight - baseLineHeight, {
              fill: 'black'
            });
          circle = svg.circle(g, this.seq2Screen(site.start) - this.scale / 2, y, 4, {
            fill: 'url(#siteWGradient' + i + this.viewer.getData().uniprotID + ')',
            stroke: color.darkerColor,
            strokeWidth: 1
          });
        } else {
          rect = svg.rect(g, this.seq2Screen(site.start) - this.scale / 2, y, 2, siteTrackHeight, {
            fill: 'black'
          });

          circle = svg.circle(g, this.seq2Screen(site.start) - this.scale / 2,
            y + siteTrackHeight - 4, 4, {
              fill: 'url(#siteWGradient' + i + this.viewer.getData().uniprotID + ')',
              stroke: color.darkerColor,
              strokeWidth: 1
            });
        }

        var pdbInfo = "";

        if ((typeof feature.tracks[0].pdbID) === 'string') {

          pdbInfo = feature.tracks[0].pdbID + "." + feature.tracks[0].chainID + ": ";

        } else {
          //console.log( " did not find PDB ID for track " +
          //JSON.stringify(feature.tracks[0]) + " " +
          //(typeof feature.tracks[0].pdbID  ));

        }


        var title1 = pdbInfo;

        if (typeof site.desc !== 'undefined') {
          title1 += site.desc;
        }

        if (typeof site.name !== 'undefined') {
          title1 += " - " + site.name;
        }

        title1 += " (" + site.start + ")";

        $(rect).attr("title", title1);
        this.registerTooltip(rect);

        $(circle).attr("title", title1);


        if (feature.trackName !== 'undefined' && feature.trackName === 'variation') {
          var extLinks = site.externalLinks;

          if (typeof extLinks !== 'undefined' && extLinks !== "" && extLinks.length > 0) {
            $(circle).data("extLinks", site.externalLinks);
          }
        }
        this.registerTooltip(circle);

        if (isPhospho) {

          $(circle).attr("id", site.acc);
          $(circle).attr("name", this.title);

        }

        if (typeof modalFunction !== 'undefined') {
          $(circle).css('cursor', 'pointer');
          //// need to pass site info in..

          $(circle).bind('click', $.proxy(modalFunction, this, site));
        }


      }
    };

    Draw.prototype.drawUniprotChainData = function(svg, y, callback) {

      var chains = this.viewer.getData().chains;

      var rows = this.breakTrackInRows(chains.tracks);

      if (rows < 1) {
        return y;
      }

      y = this.drawGenericTrack(svg, rows, y, 'Molec. Processing', 'chainTrack',
        this.param.up_colors, undefined, callback, this.viewer.getData().chains.label);

      return y;

    };



    Draw.prototype.drawTick = function(svg, seqpos, y, height) {

      var g = svg.group({
        fontWeight: 'normal',
        fontSize: 10,
        fill: 'black'
      });
      svg.text(g, this.seq2Screen(seqpos), y - 2 - 1, (seqpos + 1) + "");
      svg.rect(this.seq2Screen(seqpos), y, 1 * this.scale, height, {
        fill: 'black'
      });

    };




    Draw.prototype.drawUniprotFeatures = function(svg, y) {

      var callback = this.popups.callbackUniProtFeature;


      if (typeof this.viewer.getData().chains !== 'undefined') {

        y = this.drawUniprotChainData(svg, y, callback);

      }

      if (
        (typeof this.viewer.getData().motifs !== 'undefined') &&
        (typeof this.viewer.getData().motifs.tracks !== 'undefined')
      ) {


        var motifs = this.viewer.getData().motifs.tracks;

        var motifrows = this.breakTrackInRows(motifs);

        //alert(" motif has " + motifrows.length + " rows" + JSON.stringify(motifrows));

        y = this.drawGenericTrack(svg, motifrows, y, 'Motif', 'motifTrack',
          this.param.up_colors, undefined, callback, this.viewer.getData().motifs.label);

      }

      if ((typeof this.viewer.getData().enzymeClassification !== 'undefined') &&
        (this.viewer.getData().enzymeClassification.tracks.length > 0)) {

        var ecs = this.viewer.getData().enzymeClassification.tracks;

        var ecrows = this.breakTrackInRows(ecs);

        y = this.drawRangedTrack(svg, ecrows, y, 'E.C.', 'enzymeClassificationTrack',
          this.param.up_colors, undefined, this.popups.callbackec, this.viewer.getData().enzymeClassification.label);

      }

      return y + this.param.trackHeight;

    };


    Draw.prototype.drawPDBSecstruc = function(svg, y) {


      var secstruc = this.viewer.getData().secstruc;

      if (typeof secstruc === 'undefined') {
        return y;
      }

      y = this.drawSecstrucTrack(svg, secstruc, y);

      return y + this.param.trackHeight;

    };

    Draw.prototype.drawSecstrucTrack = function(svg, trackdata, y) {


      if (typeof trackdata === 'undefined') {
        return y;
      }

      if (typeof trackdata.tracks === 'undefined') {
        return y;
      }

      var callback = this.popups.callbackSecStruc;

      var trackName = 'Secstruc';
      var label = trackdata.label;


      var g0 = this.getGroup(label + this.viewer.getData().uniprotID);

      if (this.viewer.getData().tracks.length > 0) {
        this.drawName(svg, g0, y, trackName, undefined, label);
      }

      // draw black line in background
      var bw_color = this.param.bw_colors[0];
      svg.linearGradient(svg.defs(), 'secstrucBWGradient' + this.viewer.getData().uniprotID, [
          ['0%', 'white'],
          ['100%', bw_color]
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'
        }
      );

      for (var j = 0; j < this.viewer.getData().tracks.length; j++) {
        var track = this.viewer.getData().tracks[j];
        if (track === null) {
          continue;
        }
        for (var i = 0; i < track.ranges.length; i++) {
          var rangeOrig = track.ranges[i];

          if (!rangeOrig.observed) {
            continue;
          }

          var range = {};
          range.start = rangeOrig.start -1;
          range.end = rangeOrig.end  -1;
          range.name = "secstruc";
          range.desc = "coil";

          var width = (range.end - range.start) + 1;

          var line = svg.rect(g0,
            this.seq2Screen(range.start),
            y + (this.param.trackHeight / 4),
            Math.round(width * this.scale),
            (this.param.trackHeight / 4) * 2,

            {
              fill: 'url(#secstrucBWGradient' + this.viewer.getData().uniprotID + ')',

            });

          $(line).attr("title", 'coil');



          //$(line).bind('mouseover', this.popuptooltipMethod);
          //$(line).mouseout(this.mouseoutMethod);
          //$(line).css('cursor','pointer');
          this.registerTooltip(line);
          if (typeof callback !== 'undefined') {
            $(line).css('cursor', 'pointer');
            $(line).bind('click', $.proxy(callback, this, range));

          }
        }
      }

      for (var i1 = 0; i1 < trackdata.tracks.length; i1++) {
        var rangeOrig1 = trackdata.tracks[i1];

        var range1 = {};
        range1.start = rangeOrig1.start - 1;
        range1.end = rangeOrig1.end - 1;
        range1.name = rangeOrig1.name;
        range1.desc = rangeOrig1.desc;
        range1.note = rangeOrig1.note;

        var width1 = (range1.end - range1.start) + 1;


        if (range1.end > this.viewer.getData().length) {
          // probably a chimera protein, we can't deal with those currently
          continue;
        }

        var color = this.param.bw_colors[3]; // grey

        if (range1.name === 'H' || range1.name === 'I' || range1.name === 'G') {
          color = this.param.paired_colors[5];
        } else if (range1.name === 'E' || range1.name === 'B') {
          color = this.param.paired_colors[6];
        } else if (range1.name === 'T') {
          color = this.param.paired_colors[0];
        }


        //alert(JSON.stringify(color));
        var x1 = this.seq2Screen(range1.start);

        var defs2 = svg.defs();
        svg.linearGradient(defs2, trackName + 'GR' + i1 + this.viewer.getData().uniprotID, [
            ['0%', color.lightercolor],
            ['100%', color.darkercolor]
          ],
          0, y, 0, y + this.param.trackHeight, {
            gradientUnits: 'userSpaceOnUse'

          }
        );

        var g2 = svg.group({
          id: trackName + this.viewer.getData().uniprotID,
          fontWeight: 'bold',
          fontSize: '10',
          fill: color.textcolor
        });

        var rect = {};
        if (range1.name === 'H' || range1.name === 'G' ||
          range1.name === 'I' || range1.name === 'E') {

          rect = svg.rect(g2, x1, y, width1 * this.scale, this.param.trackHeight,
            0, 0, {
              fill: 'url(#' + trackName + 'GR' + i1 + this.viewer.getData().uniprotID + ')',
              stroke: color.darkercolor,
              strokeWidth: 1
            });
        } else {
          // a smaller box (moved 1 pix to the left so an adjacent
          //large box looks more dominant
          rect = svg.rect(g0, x1 + 1, y + (this.param.trackHeight / 8),
            width1 * this.scale, (this.param.trackHeight / 8) * 7,
            0, 0, {
              fill: 'url(#' + trackName + 'GR' + i1 + this.viewer.getData().uniprotID + ')',
              stroke: color.darkercolor,
              strokeWidth: 1
            });


        }

        if (range1.name === 'H') {
          for (var xl = x1; xl < (this.seq2Screen(range1.end)); xl += 4) {
            svg.line(g0, xl, y + this.param.trackHeight, xl + 4, y, {
              fill: color.darkercolor,
              stroke: color.darkercolor
            });

          }
        }


        var t = range1.desc;
        if (typeof range1.desc === 'undefined') {
          t = range1.name;
        }
        if (typeof range1.note !== 'undefined') {
          t += " (from " + range1.note + ")";
        }
        var title = t + " (" + rangeOrig1.start + "-" + rangeOrig1.end + ")";
        $(rect).attr('title', title);

        //$(rect).bind('mouseover', this.popuptooltipMethod);
        //$(rect).mouseout(this.mouseoutMethod);
        //$(rect).css('cursor','pointer');
        //console.log(rect);
        //this.registerTooltip(rect);
        if (typeof callback !== 'undefined') {
          $(rect).css('cursor', 'pointer');
          $(rect).bind('click', $.proxy(callback, this, range1));

          this.registerTooltip(rect);
        }

      }

      return y + this.param.trackHeight;

    };


    /** Draws a 'ranged' track. I.e. it indicated start and stop positions
     *
     * @param svg
     * @param rows
     * @param y
     * @param label
     * @param trackName
     * @param mycolors
     * @param url
     * @param callbackFunction
     * @returns
     */
    Draw.prototype.drawRangedTrack = function(svg, rows, y, label,
      trackName, mycolors, url, callbackFunction, info) {


      if (rows.length === 0) {
        return y;
      }

      var newLocationMethod = function() {
        document.location.href = url;
      };


      var colorPos = -1;
      // var g0 = svg.group({
      //         id: label + this.viewer.getData().uniprotID,
      //         fontWeight: 'bold',
      //         fontSize: '10', fill: 'black'
      //     }
      // );

      var g0 = this.getGroup(label + this.viewer.getData().uniprotID);

      this.drawName(svg, g0, y, label, undefined, info);

      for (var j = 0; j < rows.length; j++) {

        var row = rows[j];

        for (var i = 0; i < row.length; i++) {

          try {
            var rangeOrig = row[i];

            if (typeof rangeOrig === 'undefined') {
              continue;
            }

            if (typeof rangeOrig.desc === 'undefined') {
              continue;
            }

            var range = {};

            range.start = rangeOrig.start - 1;
            range.end = rangeOrig.end - 1;
            range.desc = rangeOrig.desc;
            range.name = rangeOrig.name;

            colorPos++;
            if (colorPos > mycolors.length - 1) {
              colorPos = 0;
            }

            var color = mycolors[colorPos];
            //alert(JSON.stringify(colorPos) + " " + JSON.stringify(mycolors));
            var width = (range.end - range.start) + 1;

            var x1 = this.seq2Screen(range.start);

            var defs = svg.defs();
            svg.linearGradient(defs, trackName + 'GR' + j + i + this.viewer.getData().uniprotID, [
                ['0%', 'white'],
                ['100%', color.darkercolor]
              ],
              0, y, 0, y + this.param.trackHeight, {
                gradientUnits: 'userSpaceOnUse'

              }
            );

            // var g = svg.group({
            //         id: trackName + this.viewer.getData().uniprotID,
            //         fontWeight: 'bold',
            //         fontSize: '10',
            //         fill: color.textcolor
            //     }
            // );

            var g = this.getGroup(trackName + this.viewer.getData().uniprotID);
            $(g).attr('fill', color.textcolor);

            // draw vertical bars at start and stop:
            svg.rect(g, x1, y, 1 * this.scale, this.param.trackHeight,
              1, 1, {
                fill: color.darkercolor,
                stroke: color.darkercolor,
                strokeWidth: 1
              });

            svg.rect(g, this.seq2Screen(range.end), y, 1 * this.scale, this.param.trackHeight,
              1, 1, {
                fill: color.darkercolor,
                stroke: color.darkercolor,
                strokeWidth: 1
              });


            // draw horizontal connector
            var rect = svg.rect(g, x1, y + this.param.trackHeight / 2 - 2, width * this.scale, 4, {
              fill: 'url(#' + trackName + 'GR' + j + i + this.viewer.getData().uniprotID + ')',
              stroke: color.darkercolor,
              strokeWidth: 1
            });

            var dispText = range.desc;

            if (trackName === 'Homology_Models') {
              dispText = "";
            }

            var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, dispText);

            this.checkTxtLength(txt, range.start, range.end, dispText);

            var title = range.name;

            title += " (" + rangeOrig.start + "-" + rangeOrig.end + ")";

            if (range.name !== range.desc) {
              title += " - " + range.desc;
            }

            if (typeof range.status !== 'undefined') {
              title += " - " + range.status;
            }

            $(rect).attr('title', title);
            //$(rect).bind('mouseover', this.popuptooltipMethod);
            //$(rect).mouseout(this.mouseoutMethod);
            this.registerTooltip(rect);


            $(txt).attr('title', title);
            this.registerTooltip(txt);


            if (typeof url !== 'undefined') {
              $(rect).css('cursor', 'pointer');
              $(txt).css('cursor', 'pointer');
              $(rect).bind('click', newLocationMethod);
              $(txt).bind('click', newLocationMethod);
            }

            if (typeof callbackFunction !== 'undefined') {
              $(rect).css('cursor', 'pointer');
              $(txt).css('cursor', 'pointer');
              $(rect).bind('click', $.proxy(callbackFunction, this, range));
              $(txt).bind('click', $.proxy(callbackFunction, this, range));
            }


          } catch (e) {
            console.log("Problem while drawing ranged track: " + label + " " + e);
          }
        }
        y += this.param.trackHeight + 5;
      }
      return y;

    };

    Draw.prototype.drawCytoplasmic = function(y, svg, range, trackName) {

      var ydraw = y + this.param.trackHeight - 2;
      var yheight = 2;
      this.drawTmLine(y, svg, range, trackName, ydraw, yheight);

    };

    Draw.prototype.drawPeriplasmic = function(y, svg, range, trackName) {

      var ydraw = y;
      var yheight = 2;
      this.drawTmLine(y, svg, range, trackName, ydraw, yheight);

    };

    Draw.prototype.drawTmLine = function(y, svg, range, trackName, ydraw, yheight) {

      //var red  = paired_colors[5];
      var blue = this.param.paired_colors[1];

      //cytoplasmic is a the bottom

      var g = this.getGroup(trackName + this.viewer.getData().uniprotID);

      var width = (range.end - range.start) + 1;

      var x1 = this.seq2Screen(range.start - 1);

      var rect = svg.rect(g, x1, ydraw, width * this.scale, yheight, {
        fill: blue.color,
        stroke: blue.darkercolor,
        strokeWidth: 1
      });
      var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);
      this.checkTxtLength(txt, range.start, range.end, range.desc);

      var title = range.desc + "-" + range.name;
      if (typeof range.status !== 'undefined') {
        title += " - " + range.status;
      }

      $(rect).attr('title', title);
      this.registerTooltip(rect);

      $(txt).attr('title', title);
      this.registerTooltip(txt);


    };

    Draw.prototype.drawIntramembrane = function(y, svg, range, trackName) {

      //var red  = paired_colors[5];
      //var blue = paired_colors[1];
      var color = this.param.bw_colors[3];
      //var color = red;
      //cytoplasmic is a the bottom


      var g = this.getGroup(trackName + this.viewer.getData().uniprotID);

      var width = (range.end - range.start) + 1;

      var x1 = this.seq2Screen(range.start - 1);


      // draw a horizontal line representing the membrane
      var rect = svg.rect(g, x1, y + this.param.trackHeight / 2, width * this.scale, 2, {
        fill: color.color,
        stroke: color.darkercolor,
        strokeWidth: 1
      });

      // draw vertical bars at start and stop:
      svg.rect(g, x1, y, 1 * this.scale, this.param.trackHeight,
        1, 1, {
          fill: color.darkercolor,
          stroke: color.darkercolor,
          strokeWidth: 1
        });

      svg.rect(g, this.seq2Screen(range.end - 1), y, 1 * this.scale, this.param.trackHeight,
        1, 1, {
          fill: color.darkercolor,
          stroke: color.darkercolor,
          strokeWidth: 1
        });


      var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);

      this.checkTxtLength(txt, range.start, range.end, range.desc);


      var title = range.desc + "-" + range.name;
      if (typeof range.status !== 'undefined') {
        title += " - " + range.status;
      }

      //title += " " + range.start + "-" + range.end;
      $(rect).attr('title', title);
      this.registerTooltip(rect);


      $(txt).attr('title', title);
      this.registerTooltip(txt);

    };

    Draw.prototype.drawTransmembrane = function(y, svg, range, trackName) {


      var red = this.param.paired_colors[5];
      //var blue = paired_colors[1];
      //var color = bw_colors[3];
      var color = red;
      //cytoplasmic is a the bottom

      var g = this.getGroup(trackName + this.viewer.getData().uniprotID);

      var width = (range.end - range.start) + 1;

      var x1 = this.seq2Screen(range.start - 1);

      var defs = svg.defs();

      svg.linearGradient(defs, trackName + 'TR' + this.viewer.getData().uniprotID, [
          ['0%', color.lightercolor],
          ['100%', color.darkercolor]
        ],
        0, y, 0, y + this.param.trackHeight, {
          gradientUnits: 'userSpaceOnUse'

        }
      );

      // draw a horizontal line representing the membrane
      var rect = svg.rect(g, x1, y, width * this.scale, this.param.trackHeight, {
        fill: 'url(#' + trackName + 'TR' + this.viewer.getData().uniprotID + ')',
        stroke: color.darkercolor,
        strokeWidth: 1
      });

      for (var xl = x1; xl < (this.seq2Screen(range.end)); xl += 4) {
        svg.line(g, xl, y + this.param.trackHeight, xl + 2, y, {
          fill: color.darkercolor,
          stroke: color.darkercolor
        });

      }

      var txt = svg.text(g, x1 + this.scale, y + this.param.trackHeight - 1, range.desc);

      this.checkTxtLength(txt, range.start, range.end, range.desc);


      var title = range.desc + "-" + range.name;
      if (typeof range.status !== 'undefined') {
        title += " - " + range.status;
      }

      //title += " " + range.start + "-" + range.end;
      $(rect).attr('title', title);
      this.registerTooltip(rect);


      $(txt).attr('title', title);
      this.registerTooltip(txt);

    };


    /** break a track array that might contain overlapping tracks into multiple non-overlapping rows
     *
     */
    Draw.prototype.breakTrackInRows = function(tracks) {
      var rows = [];

      if (tracks.length < 1) {
        return rows;
      }

      // we'll have at least one row...
      var rowArr = [];
      rows.push(rowArr);

      var featureCount = 0;

      nextTrack:
        for (var i = 0; i < tracks.length; i++) {
          var range = tracks[i];

          // weird bug, should not happen..
          if (typeof range === 'undefined') {
            continue nextTrack;
          }

          var lowestRow = 0;

          nextRow:
            for (var j = 0; j < rows.length; j++) {
              var row = rows[j];
              var foundOverlap = false;

              for (var k = 0; k < row.length; k++) {

                featureCount++;

                var f = row[k];


                var overlap = this.getOverlap(range.start, range.end, f.start, f.end);


                if (overlap > 0) {

                  foundOverlap = true;
                  lowestRow++;
                  continue nextRow;
                }
              }

              // we went through a whole row and no overlap... let's add it here..
              if (!foundOverlap) {
                break nextRow;
              }

            }
            //if (range.start == 1029 || range.start == 1023 || range.start == 980)


          if (rows.length < lowestRow + 1) {
            var rowArr1 = [];
            rows.push(rowArr1);
          }


          // add this range to the first row where it does not overlap anything.
          rows[lowestRow].push(range);
        }


      return rows;
    };

    Draw.prototype.updateTrackColors = function(coloring) {

      var counter = 0;
      var colorPos = -1;


      var colors = coloring;

      if (typeof this.viewer.getData().tracks === 'undefined') {
        return;
      }
      for (var i = 0; i < this.viewer.getData().tracks.length; i++) {

        var track = this.viewer.getData().tracks[i];

        if (track === null) {
          continue;
        }

        counter++;

        colorPos++;

        if (colorPos >= colors.length) {
          colorPos = 0;
        }


        var colorData = this.getTrackColor(colors, colorPos, track);

        track.color = colorData.color;
        track.lightercolor = colorData.lightercolor;
      }
    };

    Draw.prototype.getTrackColor = function(colors, colorPos, track) {



      //var colorMap =this.viewer.getData().colors[colorPos];
      var colorMap = colors[colorPos];
      if (this.viewer.colorBy === "Resolution") {

        //alert(colorBy + " " + track.resolution);
        if (typeof track.resolution === 'undefined') {
          return this.param.bw_colors[6];
        }

        var resolution = track.resolution;

        for (var i = 0; i < (this.param.redblue_colors.length - 1); i++) {

          if (resolution < (i + 1) * 1000) {
            //alert("i " + i + " " + resolution);
            return this.param.redblue_colors[i];
          }
        }

        // last one is the max resolution...
        return this.param.redblue_colors[this.param.redblue_colors.length - 1];

      } else if (this.viewer.colorBy === "Alignment Length") {
        // default is all in one color
        return colors[1];
      }
      // other
      return colorMap;


    };



    Draw.prototype.checkTxtLength = function(txt, start, end, fullText) {

      if (typeof fullText === 'undefined') {
        return;
      }

      var tlength = txt.getComputedTextLength();

      var width = end - start + 1;

      var availspace = width * this.scale;

      if (tlength > availspace) {
        // resize the text!

        // width in view divided by 10 px font size
        var max = Math.floor(availspace / 8.0);
        //console.log('avail space: ' + availspace +' px ' +
        //" new max: " + max + " " + txt.getBoundingClientRect().width + " " + tlength);
        //alert("text " + domain.name + " too long! " + max );

        txt.firstChild.data = fullText.substring(0, max);

        //txt.getBoundingClientRect().width = availspace;

        //txt.setBoundingClientRect()
        //tlength = txt.getComputedTextLength();
      }

    };


    /** Count the number of positions that are overlapping the two ranges xs-ys and as-bs
     *
     */
    Draw.prototype.getOverlap = function(x, y, a, b) {

      var overlap = 0;
      //1: do we overlap?

      if (
        (
          // 2nd starts in range of 1st
          (x <= a) && (a <= y)
        ) ||
        (
          // 2nd ends in range of 1st
          (x <= b) && (b <= y)
        ) ||
        // 1st is contained in 2nd
        (a <= x && y <= b)
      ) {

        //2: how much is it?

        if (x < a) {
          if (y < b) {
            overlap = y - a;
          } else {
            overlap = b - a;
          }
        } else {
          if (y < b) {
            overlap = y - x;
          } else {
            overlap = b - x;
          }

        }

      }

      return overlap;
    };

    /** Set the scale of the current display. The value is the amount of
     * space given for rendering one amino acid.
     *
     * @param aaWidth - width of one amino acid
     */
    Draw.prototype.setScale = function(aaWidth) {

      //console.log("draw: set scale  " + aaWidth);

      if (aaWidth > this.param.maxTextSize) {
        aaWidth = this.param.maxTextSize;
      }

      this.scale = aaWidth;


    };

    Draw.prototype.registerTooltip = function(element, title) {

      try {
        if (typeof title === 'undefined') {
          title = $(element).attr('title');
        }

        if (typeof element === 'undefined') {
          console.err("got undefined for element?? " + title);
        }

        if (typeof $(element) === 'undefined') {
          console.err("got undefined for element?? " + element + " " + title);
        }

        $(element).attr({
          'rel': 'tooltip',
          'title': title,
          'data-toggle': 'tooltip',
          'data-container': 'body'
        });

        $(element).css('cursor', 'pointer');

        //$(element).tooltip();

      } catch (err) {
        console.log("could not register tooltip for " + JSON.stringify(element) + " " + JSON.stringify(title));
        console.log(err);
      }
    };

    return {
      Draw: function(viewer) {
        return new Draw(viewer);
      }
    };

  });
