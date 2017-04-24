;(function() {
    var regions = [
        {id: 1,  name: 'Винницкая',                  selected: false  },
        {id: 2,  name: 'Волынская',                  selected: false  },
        {id: 3,  name: 'Днепропетровская',           selected: false  },
        {id: 4,  name: 'Донецкая',                   selected: false  },
        {id: 5,  name: 'Житомирская',                selected: false  },
        {id: 6,  name: 'Закарпатская',               selected: false  },
        {id: 7,  name: 'Запорожская',                selected: false  },
        {id: 8,  name: 'Ивано-Франковская',          selected: false  },
        {id: 9,  name: 'Киевская',                   selected: false  },
        {id: 10, name: 'Кировоградская',             selected: false  },
        {id: 11, name: 'Луганская',                  selected: false  },
        {id: 12, name: 'Львовская',                  selected: false  },
        {id: 13, name: 'Николаевская',               selected: false  },
        {id: 14, name: 'Одесская',                   selected: false  },
        {id: 15, name: 'Полтавская',                 selected: false  },
        {id: 16, name: 'Ровненская',                 selected: false  },
        {id: 17, name: 'Сумская',                    selected: false  },
        {id: 18, name: 'Тернопольская',              selected: false  },
        {id: 19, name: 'Харьковская',                selected: false  },
        {id: 20, name: 'Херсонская',                 selected: false  },
        {id: 21, name: 'Хмельницкая',                selected: false  },
        {id: 22, name: 'Черкасская',                 selected: false  },
        {id: 23, name: 'Черниговская',               selected: false  },
        {id: 24, name: 'Черновицкая',                selected: false  },
        {id: 25, name: 'Киев',                       selected: false  },
        {id: 26, name: 'Севастополь',                selected: false  },
        {id: 27, name: 'Автономная Республика Крым', selected: false  }
    ];

    function getRegionById(id)  {
        for (var i=0; i < regions.length; i++) {
            if (regions[i].id == id) return regions[i];
        }
        return null;
    }
    function renderView() {
        var ulHtmlForIncludeList = '';
        var ulHtmlForExcludeList = '';
        regions.forEach(function(region) {
            var checked = region.selected ? 'checked' : '';
            ulHtmlForIncludeList += '<li>' +
                                    '    <input type="checkbox" id="region-' + region.id + '" ' +
                                    '           data-region-id="' + region.id + '" ' + (region.selected ? 'checked' : '') +' >' +
                                    '    <label for="region-' + region.id + '">' + region.name + '</label>' +
                                    '</li>';
            ulHtmlForExcludeList += '<li>' +
                                    '    <input type="checkbox" id="region-' + region.id + '" ' +
                                    '           data-region-id="' + region.id + '" ' + (region.selected ? '' : 'checked') +' >' +
                                    '    <label for="region-' + region.id + '">' + region.name + '</label>' +
                                    '</li>';
        });
        $('.includeList .listBox').html(ulHtmlForIncludeList);
        $('.excludeList .listBox').html(ulHtmlForExcludeList);

        var ulHtml = '';
        regions.forEach(function(region) {
            if(region.selected){
                ulHtml += '<li>' +
                    '    <span>' + region.name + '</span>' +
                    '    <div class="del" data-region-id="' + region.id + '"></div>' +
                    '</li>';
            }
        });
        $('.selectedRegions').html(ulHtml);
    }

    $('.selectViewPart').click(function(event) {
        $(this).next().slideToggle(200);
        event.stopPropagation();
    });

    $('.withSecondLevel').click(function(event) {
        $(this).children('.regionList').fadeToggle(200);
        if($(this).hasClass('excludeList')) $('.includeList .regionList').fadeOut(200);
        else $('.excludeList .regionList').fadeOut(200);
        event.stopPropagation();
    });


    $('.selectAllRegions, .excludeAllRegions').click(function() {
        var bool = $(this).hasClass('selectAllRegions');
        regions.forEach(function(region) {
            region.selected = bool;
        });
        renderView();
    });

    $('.dropdownBox li').on('click', function() {
        var text = $(this).children('span').text();
        $('.selectViewPart').text(text);
    });

    $('.regionList').click(function(event) {
        event.stopPropagation();
    });

    $('.searchField').on('input', function() {
        var searchStr = this.value.toLowerCase();
        $(this).next('.listBox').children('li').each(function() {
            var regionName = $(this).children('label').text();
            if(regionName.toLowerCase().indexOf(searchStr) !== -1) $(this).show();
            else $(this).hide();
        });
    });

    $(document).on('click', '.selectedRegions .del', function() {
        var regionId = this.dataset.regionId;
        getRegionById(regionId).selected = false;
        renderView();
    });

    $(document).on('change', '.includeList input:checkbox', function() {
        var regionId = this.dataset.regionId;
        getRegionById(regionId).selected = this.checked;
        renderView();
    });

    $(document).on('change', '.excludeList input:checkbox', function() {
        var regionId = this.dataset.regionId;
        getRegionById(regionId).selected = !this.checked;
        renderView();
    });

    $('body').click(function() {
        $('.includeList .regionList, .excludeList .regionList').fadeOut(100);
        $('.dropdownBox').slideUp(100);
    });

    renderView();
})();