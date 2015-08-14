# The Protein Feature View

[![Build Status](https://travis-ci.org/andreasprlic/proteinfeatureview.svg?branch=master)](https://travis-ci.org/andreasprlic/proteinfeatureview)

SVG library for visualising protein annotations

This is the library behind the Protein Feature View at [RCSB PDB](http://www.rcsb.org/pdb/protein/P06213).

![Screenshot of Protein Feature View at RCSB]
(https://raw.github.com/andreasprlic/proteinfeatureview/master/images/P06213.png "Insulin receptor - P06213 (INSR_HUMAN)")


<strong>Legend</strong>

The Protein Feature View requires a browser that supports SVG (Scalable Vector Graphics). Mouse over tracks and labels for more information.

<b>Data origin/color codes</b> <br/>

The vertical color bar on the left side indicates data provenance.

<div style="border-left:10px solid #8eb26e ; padding-bottom: 10px;">

  Data in green originates from
  <a href="http://www.uniprot.org" target="_new">UniProtKB</a>

</div>

<div style="border-left:10px solid #fdbf6f; padding-bottom: 10px;">  
  Data in yellow originates from
  <a href="http://pfam.sanger.ac.uk" target="_new">Pfam</a>,
  by interacting with the <a href="http://hmmer.janelia.org/" target="_new">HMMER3 web site</a>
</div>

<div style="border-left:10px solid #6a3d9a; padding-bottom: 10px;">
  Data in purple originates from
  <a href="http://www.phosphosite.org" target="_new">Phosphosite</a>.
</div>

<div style="border-left:10px solid #ff7f00;padding-bottom: 10px;">
  Data in orange originates from
  the <a href="http://scop.mrc-lmb.cam.ac.uk/scop/">SCOP </a> (version 1.75)
  and <a href="http://scop.berkeley.edu">SCOPe</a> (version 2.04) classifications.
</div>

<div style="border-left:10px solid grey; padding-bottom: 10px;">
  Data in grey has been calculated using <a href="http://www.biojava.org" target="_new">BioJava <span class='iconSet-main icon-external' title='Link to UniProtKB entry. '>&nbsp;</span></a>.
  Protein disorder predictions are based on JRONN (Troshin, P.  and Barton, G. J. unpublished), a Java implementation of
  <a href="http://www.ncbi.nlm.nih.gov/pubmed/15947016" target="_new">RONN
    <span class='iconSet-main icon-external' title='Link to UniProtKB entry. '>&nbsp;</span></a>

    <ul>
      <li>
        Red: potentially disorderd region
      </li>

      <li> Blue: probably ordered region.
      </li>
    </ul>
  </div>
</div>

<div style="border-left:10px solid grey; padding-bottom: 10px;">

  Hydropathy has been calculated using a sliding window of 15 residues and summing up scores from standard hydrophobicity tables.
  <ul>
    <li>
      Red: hydrophobic
    </li>
    <li>
      Blue: hydrophilic.
    </li>
  </ul>

</div>

<div style="border-left:10px solid #cab2d6;padding-bottom: 10px; margin-right: 10px;">

  Data in lilac represent the genomic exon structure projected onto the UniProt sequence.

</div>

<div style="border-left:10px solid #196090; padding-bottom: 10px;">

  Data in blue originates from PDB

  * Secstruc: Secondary structure projected from representative
  PDB entries onto the UniProt sequence.

</div>

<div style="border-left:10px solid #e31a1c; padding-bottom: 10px;">

  Data in red indicates combined ranges of Homology Models from
  <a href="http://www.sbkb.org" target="_new">SBKB
    <span class='iconSet-main icon-external' title='Link to UniProtKB entry. '>&nbsp;</span>
  </a> and the
  <a href="http://www.proteinmodelportal.org" target="_new">Protein Model Portal
    <span class='iconSet-main icon-external' title='Link to UniProtKB entry. '>&nbsp;</span>
  </a>

</div>

## Event model

An event model allows to register "listeners" that get triggered when certain events occur. A listener can get registered with:

```javascript
 pfv.addListener(eventName,function);
```

currently supported events:

 * viewerReady
 * sliderMoved
 * sliderReleased

## Dependencies

* jquery (V. 1.7.2+)
* jquery SVG (V. 1.4.5+)
* bootstrap-slider (V. 4.10.0+)

## License

GPL 3.0 [http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

## How to cite

At the present, there is no primary citation yet, however Protein Feature View got mentioned in the most recent [RCSB PDB Nucleic acid research database issue paper](http://nar.oxfordjournals.org/content/43/D1/D345.full).

## Author

Andreas Prlic - [RCSB Protein Data Bank](http://www.rcsb.org)

## How to get started?

Take a look at [minimal.html](minimal.html) for how to create a basic setup
