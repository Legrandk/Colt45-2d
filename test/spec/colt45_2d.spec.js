describe("Colt45_2d", function() {

    it("should be defined", function() {
        expect(Colt45_2d).to.be.defined;
    });
    beforeEach(function() {
        this.defaultConfig =  {
            canvas : { id: 'game_canvas', w: 800, h: 600 },
            url    : { atlas:'./assets/json/grits_effects.json' }
        };
        this.colt45_2d = new Colt45_2d();
    });

    afterEach(function() {
        delete this.colt45_2d;
        delete this.defaultConfig;
    }); 


    describe("init", function() {

        it("should create an instance of Colt45_2d", function() {
            expect(this.colt45_2d).to.be.defined;
            expect(this.colt45_2d).to.be.an("object");
            expect(this.colt45_2d).to.be.an.instanceOf(Colt45_2d);
        });

        it("should set properties", function() {
            expect(this.colt45_2d.config).to.be.defined;
            expect(this.colt45_2d.canvas).to.be.defined;
            expect(this.colt45_2d.context).to.be.defined;
        });

        it("should create a colt45_2d object with default config", function() {
            expect(this.colt45_2d).to.have.property("config")
            .that.is.an("object")
            .that.deep.equals(this.defaultConfig);
        });

        it("should create a colt45_2d object with custom config", function() {
            var customConfig =  {
                canvas : { id: 'foo', w: 1, h: 2 },
                url    : { atlas:'bar' }
            };
            var colt45_2dCustom = new Colt45_2d(customConfig);
            expect(colt45_2dCustom).to.have.property("config")
            .that.is.an("object")
            .that.deep.equals(customConfig);
        });

        it("should create a colt45_2d object with merged custom config", function() {
            var colt45_2dMergedCustom = new Colt45_2d({canvas: {w: 1}});
            this.defaultConfig.canvas.w=1;

            expect(colt45_2dMergedCustom).to.have.property("config")
            .that.is.an("object")
            .that.deep.equals(this.defaultConfig);
        });
    });

    describe("loadConfig", function() {
        it("should throw an exception when has null as parameter", function() {
            var fn = function() { this.colt45_2d.loadConfig(null)};
            expect(fn).to.throw(Error);
        });
        it("should throw an exception when hasn't an object as parameter", function() {
            var fn = function() { this.colt45_2d.loadConfig(1)};
            expect(fn).to.throw(Error);
        });
    });
});
