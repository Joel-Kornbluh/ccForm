describe('ccForm home page', function(){

    var baseUrl = 'http://127.0.0.1/ccForm/build/#/';

    beforeEach(function(){
        browser.get(baseUrl + '');
        p = protractor.getInstance();
    });

    it('when CID is focused the card should flip', function(){

        var cid = by.model('currentCC.cid');

        expect(p.isElementPresent(cid)).toBe(true);

        element(cid).sendKeys('4');



    });




});
