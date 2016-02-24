System.register([], function(exports_1) {
    var FieldTypes, OptionsPresentationTypes;
    return {
        setters:[],
        execute: function() {
            exports_1("FieldTypes", FieldTypes = [
                {
                    label: '單行文字',
                    value: 'shortText'
                },
                {
                    label: '多行文字',
                    value: 'longText'
                },
                {
                    label: '日期',
                    value: 'date'
                },
                {
                    label: '選擇',
                    value: 'options'
                },
                {
                    label: '表格',
                    value: 'table'
                }
            ]);
            exports_1("OptionsPresentationTypes", OptionsPresentationTypes = [
                {
                    label: '單選',
                    value: 'radio'
                },
                {
                    label: '多選',
                    value: 'checkbox'
                },
                {
                    label: '下拉式',
                    value: 'option'
                }
            ]);
        }
    }
});
//# sourceMappingURL=constants.js.map