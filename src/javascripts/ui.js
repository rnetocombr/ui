jQuery(document).ready(function(){

  /*
  ** data-mask
  */
  $("[data-mask]").each(function(){

    var el = $(this);
    var mask = el.data("mask").toString();

    if ( $.inArray( mask, [ "money", "moneys", "$", "$$", "$$$", "dinheiro", "dinheiros" ] ) !== -1 ) {
      el.maskMoney({prefix:'', thousands:'', decimal:'.', affixesStay: false});
      return;
    }

    var placeholder = mask;
    placeholder = placeholder.replace(/0/g, '_');
    placeholder = placeholder.replace(/9/g, '_');
    placeholder = placeholder.replace(/Z/g, '_');
    placeholder = placeholder.replace(/A/g, '_');
    placeholder = placeholder.replace(/S/g, '_');

    el.mask(mask, {
      clearIfNotMatch: true,
      placeholder: placeholder
    });

  });

  /*
  ** data-filter
  */
  $("[data-filter]").each(function(){

    var defaultMasks = {
      pint:     /[\d]/,
      'int':    /[\d\-]/,
      integer:  /[\d\-]/,
      pnum:     /[\d\.]/,
      money:    /[\d\.\s,]/,
      num:      /[\d\-\.]/,
      hex:      /[0-9a-f]/i,
      email:    /[a-z0-9_\.\-@]/i,
      alpha:    /[a-z_]/i,
      letter:   /[a-z_]/i,
      letters:  /[a-z_]/i,
      alphanum: /[a-z0-9_]/i,
      letter_and_number: /[a-z0-9_]/i,
      letters_and_numbers: /[a-z0-9_]/i
    };

    var el = $(this);
    var filter = el.data("filter");

    if (defaultMasks[filter] !== undefined) {
      el.keyfilter(defaultMasks[filter]);
    } else {
      el.keyfilter(new RegExp(filter, "i"));
    }

  });

  /*
  ** data-selected
  */
  $("[data-selected]").each(function(){

    var el = $(this);
    var el_value = String(el.data("selected"));
    var ar_el_values = [];

    $.each(el_value.split(","), function(index, value){
        ar_el_values.push( $.trim(value) );
    });

    if (el_value !== "" && el_value !== undefined) {
        el.find("option").each(function(){
            var option = $(this);
            option.removeAttr("selected");

            if ( $.inArray($.trim(""+option.val()), ar_el_values) !== -1  ) {
                option.prop("selected", "selected");
                return;
            }
        });
    }

    el.trigger("change");

  });

  /*
  ** data-checked
  */
  $("[data-checked]").each(function(){

    var el = $(this);
    var value = $.trim( el.data("checked") );

    if (value !== "" && value !== "false" && value !== "null" && value !== "0" && value !== "off" && value !== "no" && value !== "nao" && value !== "não") {
      el.prop("checked", "checked");
    }

    el.trigger("change");

  });

  /*
  ** Enable jQuery-SafeForm for every form in the page.
  ** Goodbye double submissions.
  */
  $("form").each(function(){

    var $el = $(this);

    $el.safeform({
      timeout: 2500
    });

  });

}); // ready
