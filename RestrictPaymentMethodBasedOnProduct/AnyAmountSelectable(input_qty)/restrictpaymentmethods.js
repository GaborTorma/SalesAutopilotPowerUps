<script>
/**
 * Ez a program szabad szoftver; terjeszthető illetve módosítható a Free Software
 * Foundation által kiadott GNU General Public License dokumentumában leírtak;
 * akár a licenc 3-as, akár (tetszőleges) későbbi változata szerint.
 * 
 * Ez a program abban a reményben kerül közreadásra, hogy hasznos lesz, de minden
 * egyéb GARANCIA NÉLKÜL, az ELADHATÓSÁGRA vagy VALAMELY CÉLRA VALÓ
 * ALKALMAZHATÓSÁGRA való származtatott garanciát is beleértve. További
 * részleteket a GNU General Public License tartalmaz.
 * 
 * A felhasználónak a programmal együtt meg kell kapnia a GNU General Public
 * License egy példányát; ha mégsem kapta meg, akkor tekintse meg a
 * http://gnu.hu/gplv3.html oldalon.
 **/
 

mmjQuery(document).ready(function(){
    //Megadjuk a term�k-fizet�si m�d megfeleltet�st:
    //termek_fizetes_matrix['term�kid'] = [fizet�si m�dok];
    //Ha egy term�k nem szerepel a m�trixban, akkor ahhoz minden fizet�si m�d enged�lyezett
    //Ha t�bb term�k van kiv�lasztva, az a fizet�si m�d el�rhet�, amelyik mindegyikhez enged�lyezett
    var termek_fizetes_matrix = Array();
    termek_fizetes_matrix['123456'] = [987, 2654, 321];
    termek_fizetes_matrix['789101'] = [321, 548];

    //Ha v�ltozik a kiv�lasztott term�k
    mmjQuery(".prodqty").change(function() {
        //Minden m�dot bekapcsolunk, �s kikapcsoljuk majd a nem kell� m�dokat
    	mmjQuery(".shippingmethodradio").parent().show();

        //Minden kiv�lasztott term�kre
        mmjQuery('.prodqty').each( function() {
    		if( 0<mmjQuery(this).val() ) {
    			var selected_prod = mmjQuery(this).prop('name').substr(4);

            //Ha van a term�khez korl�toz�s
    			if(termek_fizetes_matrix[selected_prod]) {
                //Minden fizet�si m�dra
		  			mmjQuery('.shippingmethodradio').each( function() {
                    //Ha a fizet�si m�d nincs a term�khez enged�lyezettek k�z�tt
		  				if( !termek_fizetes_matrix[selected_prod].includes(parseInt(mmjQuery(this).val())) ) {
                        //Akkor elrejtj�k
		  					mmjQuery(this).parent().hide();

                        //Ha ez a m�d van �pp kiv�lasztva
		  					if( mmjQuery(this).prop('checked') ) {
                            //Akkor kikapcsoljuk a kiv�laszt�st
		  						mmjQuery(this).prop('checked',false);
                            //�s elt�ntetj�k az esetleges K�rty�s fizet�si m�d blokkot
		  						mmjQuery("#online-payment-container").hide();
		  					}
		  				}
		  			});
	    		}
	    	}
    	});
        //Ha csak egy enged�lyezett fizet�si m�d van, azt v�lasszuk is ki egyb�l
    	if (1==mmjQuery('.shippingmethodradio:visible').length) {
    		mmjQuery('.shippingmethodradio:visible').prop('checked', true);
    	}
    });
});
</script>