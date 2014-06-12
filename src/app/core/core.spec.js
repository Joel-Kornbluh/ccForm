describe('ccForm.core specs', function(){

	beforeEach(function(){
		if(!this.a) this.a = 'a';
	});

	afterEach(function(){

	});



	it('test1', function(){

		var arr = ['1234', '2134', '2342', '2424', '124242', '2142421', '21424', '21342'];
		
		this.a = this.a + 'a';
		expect(this.a).toBe('aa');
	});

	it('test2', function(){

		expect(this.a).toBe('a');
	});

	it('test3', function(){

		
	});
});