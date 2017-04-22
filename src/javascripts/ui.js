/*
 ** jquery-form-validator
 */
$.validate();

/*
 ** bootstrap-tooltip
 */
$('[data-toggle="tooltip"]').tooltip()

/*
 ** data-mask
 **
 **  '0': {pattern: /\d/},
 **  '9': {pattern: /\d/, optional: true},
 **  '#': {pattern: /\d/, recursive: true},
 **  'A': {pattern: /[a-zA-Z0-9]/},
 **  'S': {pattern: /[a-zA-Z]/}
 **
 */
$("[data-mask]").each(function() {
  var el = $(this);
  var mask = el.data("mask").toString();

  var placeholder = "";
  for (var char_pos = 0; char_pos < mask.length; char_pos++) {
    if ($.inArray(mask.charAt(char_pos), ['0', '9', '#', 'A', 'S']) !== -1) {
      placeholder += "_";
    } else {
      placeholder += mask.charAt(char_pos);
    }
  }

  if ($.inArray(mask, ["money", "$", "dinheiro"]) !== -1) {
    el.maskMoney({
      prefix: '',
      thousands: '',
      decimal: '.',
      affixesStay: false
    });
    return;
  }

  el.mask(mask, {
    clearIfNotMatch: true,
    placeholder: placeholder
  });
});


/*
 ** data-datepicker
 */
$("[data-datepicker]").each(function(index, el) {

  $(el).datepicker({
    format: "dd/mm/yyyy",
    language: "pt-BR",
    todayBtn: "linked",
    todayHighlight: true,
    autoclose: true
  });

});


/*
 ** data-table
 */
$("table[data-table]").each(function() {

  var el = $(this);

  var options = {
    "order": [],
    "language": {
      "sEmptyTable": "Nenhum registro encontrado",
      "sInfo": "Mostrando de _START_ ate _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando 0 ate 0 de 0 registros",
      "sInfoFiltered": "(Filtrados de _MAX_ registros)",
      "sInfoPostFix": "",
      "sInfoThousands": ".",
      "sLengthMenu": "_MENU_ resultados por pagina",
      "sLoadingRecords": "Carregando...",
      "sProcessing": "Processando...",
      "sZeroRecords": "Nenhum registro encontrado",
      "sSearch": "Pesquisar",
      "oPaginate": {
        "sNext": "Proximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Ultimo"
      },
      "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
      }
    }
  };

  if (el.data("rows")) {
    options["pageLength"] = el.data("rows");
  }

  if (el.data("export") !== undefined) {
    $.extend(options, {
      "dom": 'Bfrtip',
      "buttons": [{
          text: "TXT",
          extend: 'csvHtml5',
          fieldSeparator: '\t',
          filename: 'arq',
          extension: '.txt',
          fieldBoundary: ""
        },
        {
          text: "CSV",
          extend: 'csvHtml5',
          fieldSeparator: ';',
          filename: 'arq',
          extension: '.csv',
          fieldBoundary: ""
        },
        {
          text: "XLS",
          extend: 'csvHtml5',
          fieldSeparator: '\t',
          filename: 'arq',
          extension: '.xls',
          fieldBoundary: ""
        }
      ]
    });
  }

  el.dataTable(options);
});

/*
 ** data-selected
 */
$("[data-selected]").each(function() {
  var el = $(this);
  var el_value = String(el.data("selected"));
  var ar_el_values = [];

  $.each(el_value.split(","), function(index, value) {
    ar_el_values.push($.trim(value));
  });

  if (el_value !== "" && el_value !== undefined) {
    el.find("option").each(function() {
      var option = $(this);
      option.removeAttr("selected");

      if ($.inArray($.trim("" + option.val()), ar_el_values) !== -1) {
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
$("[data-checked]").each(function() {
  var el = $(this);
  var value = $.trim(el.data("checked"));

  if (value !== "" && value !== "false" && value !== "null" && value !== "0" && value !== "off" && value !== "no" && value !== "nao" && value !== "não") {
    el.prop("checked", "checked");
  }

  el.trigger("change");
});

/*
 ** jquery-safeform
 */
$("form").each(function() {
  var $el = $(this);

  $el.safeform({
    timeout: 2500
  });
});

/*
 ** bootstrap-submenu
 */
$('[data-submenu]').submenupicker();
