const mydata = ['jerzy', 'mirek', 'renata'];
$(document).ready(() => {
  const rules_widgets = {
    condition: 'OR',
    rules: [{
      id: 'date',
      operator: 'equal',
      value: '1991/11/17',
    }, {
      id: 'category',
      operator: 'equal',
      value: '38',
    }, {
      condition: 'AND',
      rules: [{
        id: 'coord',
        operator: 'equal',
        value: 'B.3',
      }],
    }],
  };

  // Fix for Selectize
  $('#builder-widgets').on('afterCreateRuleInput.queryBuilder', (e, rule) => {
    if (rule.filter.plugin == 'selectize') {
      rule.$el.find('.rule-value-container').css('min-width', '200px')
        .find('.selectize-control').removeClass('form-control');
    }
  });

  // Fix for Bootstrap Datepicker
  $('#builder-widgets').on('afterUpdateRuleValue.queryBuilder', (e, rule) => {
    if (rule.filter.plugin === 'datepicker') {
      console.log('date');
      console.log(rule.$el.find('.rule-value-container [name$=_0]').val());
      rule.$el.find('.rule-value-container input').datepicker('update');
    }
  });

  $('#builder-widgets').queryBuilder({
    plugins: ['bt-tooltip-errors', 'chosen-selectpicker'],

    filters: [{
      id: 'date',
      optgroup: 'data',
      label: 'Datepicker',
      type: 'date',
      validation: {
        format: 'YYYY/MM/DD',
      },
      plugin: 'datepicker',
      plugin_config: {
        format: 'yyyy/mm/dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true,
      },
    }, {
      id: 'category',
      label: 'Selectize',
      type: 'string',
      plugin: 'selectize',
      plugin_config: {
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        sortField: 'name',
        create: true,
        maxItems: 1,
        plugins: ['remove_button'],
        onInitialize() {
          const that = this;
          if (localStorage.demoData === undefined) {
            console.log('nie ma local ');
            $.getJSON(`${baseurl}/assets/demo-data.json`, (data) => {
              localStorage.demoData = JSON.stringify(data);
              data.forEach((item) => {
                console.log(item);
                that.addOption(item);
              });
            });
          } else {
            console.log('jest local');
            JSON.parse(localStorage.demoData).forEach((item) => {
              console.log(item);
              that.addOption(item);
            });
          }
        },
      },
      valueSetter(rule, value) {
        rule.$el.find('.rule-value-container input')[0].selectize.setValue(value);
      },
    }, {
      id: 'coord',
      label: 'Coordinates',
      type: 'string',
      validation: {
        format: /^[A-C]{1}.[1-6]{1}$/,
      },
      input(rule, name) {
        const $container = rule.$el.find('.rule-value-container');

        $container.on('change', `[name=${name}_1]`, function () {
          let h = '';

          switch ($(this).val()) {
            case 'A':
              h = '<option value="-1">-</option> <option value="1">1</option> <option value="2">2</option>';
              break;
            case 'B':
              h = '<option value="-1">-</option> <option value="3">3</option> <option value="4">4</option>';
              break;
            case 'C':
              h = '<option value="-1">-</option> <option value="5">5</option> <option value="6">6</option>';
              break;
          }

          $container.find('[name$=_2]')
            .html(h).toggle(!!h)
            .val('-1')
            .trigger('change');
        });

        return `\
        <select name="${name}_1"> \
          <option value="-1">-</option> \
          <option value="A">A</option> \
          <option value="B">B</option> \
          <option value="C">C</option> \
        </select> \
        <select name="${name}_2" style="display:none;"></select>`;
      },
      valueGetter(rule) {
        return `${rule.$el.find('.rule-value-container [name$=_1]').val()
        }.${rule.$el.find('.rule-value-container [name$=_2]').val()}`;
      },
      valueSetter(rule, value) {
        if (rule.operator.nb_inputs > 0) {
          const val = value.split('.');

          rule.$el.find('.rule-value-container [name$=_1]').val(val[0]).trigger('change');
          rule.$el.find('.rule-value-container [name$=_2]').val(val[1]).trigger('change');
        }
      },
    }],

    rules: rules_widgets,
  });

  $('#reset').on('click', () => {
    $('#builder-widgets').queryBuilder('reset');
  });

  $('#set').on('click', () => {
    $('#builder-widgets').queryBuilder('setRules', rules_widgets);
  });

  $('#get').on('click', () => {
    const result = $('#builder-widgets').queryBuilder('getRules');

    if (!$.isEmptyObject(result)) {
      alert(JSON.stringify(result, null, 2));
    }
  });
  $('#change').on('click', () => {
    const result = $('#builder-widgets').queryBuilder('getSQL', false);

    if (result.sql.length) {
      alert(result.sql);
    }
  });
});
