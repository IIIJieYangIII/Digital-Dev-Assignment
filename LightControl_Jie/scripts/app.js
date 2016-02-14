$(document).ready(function() {

    var lighton = $('.lighton');
    var lightoff = $('.lightoff');
    var hotspot1 = $('.hotspot1');
    var default1 = $('.default');
    var backgroundon = $('.backgroundon');
    var h1 = $('h1');
    var p = $('p');
    var reset = $('.reset');
    var options = $('.options');
    var one = $('.one')
    var two = $('.two')
    var three = $('.three')
    var four = $('.four')
    var frame = $('.frame')
    var watch = $('.watch')

    //setup 
    TweenLite.set(backgroundon, {
        alpha: 0
    });

    TweenLite.set(lightoff, {
        alpha: 0
    });
    TweenLite.set(lighton, {
        alpha: 0
    });
    TweenLite.fromTo(h1, 1, {
        alpha: 0,
        y: 300,
        ease: 'easeOutQuint'
    }, {
        alpha: 1,
        y: 0,
        ease: 'easeOutQuint'
    });
    TweenLite.fromTo(p, 1, {
        alpha: 0,
        y: 300,
        ease: 'easeOutQuint'
    }, {
        delay: .2,
        alpha: 1,
        y: 0,
        ease: 'easeOutQuint'
    });
    TweenLite.fromTo(reset, 1, {
        alpha: 0,
        y: 300,
        ease: 'easeOutQuint'
    }, {
        delay: .4,
        alpha: 1,
        y: 0,
        ease: 'easeOutQuint'
    });

    // TweenLite.set(options, {
    //     alpha: 0
    // });

    $(document).on('pointermove', function(event) {
        event.preventDefault();
    });

    //launchApp
    hotspot1.on('click', function() {

        lightoff.addClass('active');
        options.addClass('one');
        default1.addClass('blur');

        // TweenLite.to(default1, 0.1667, {
        //     alpha: 0
        // });

        // TweenLite.to(one, 0.1667, {
        //     alpha: 1
        // });

        TweenLite.fromTo(lightoff, 1, {
            alpha: 0,
            y: -100,
            ease: 'Elastic.easeOut',
            onComplete: function() {
                hotspot1.addClass('disable')
            }
        }, {
            alpha: 1,
            y: 0,
            ease: 'Elastic.easeOut'
        });
    });

    //turnOn
    lightoff.on('swipestart', function(e) {
        e.preventDefault();

        //swipe down
        if (e.angle > 245 && e.angle < 305) {

            lightoff.removeClass('active');
            lighton.addClass('active');

            TweenLite.fromTo(lightoff, 2, {
                y: 100,
                ease: 'Elastic.easeOut',
                onComplete: function() {

                    TweenLite.to(backgroundon, 1, {
                        alpha: .8,
                        scaleX: 10,
                        scaleY: 10
                    });

                    TweenLite.fromTo(lighton, 2, {
                        y: 100,
                        ease: 'Elastic.easeOut',
                        alpha: 0
                    }, {
                        y: 0,
                        ease: 'Elastic.easeOut',
                        alpha: 1
                    })
                }
            }, {
                y: 0,
                ease: 'Elastic.easeOut'
            });
        }

    });

    //turnOff
    lighton.on('swipestart', function(e) {
        e.preventDefault();

        //swipe down
        if (e.angle > 245 && e.angle < 305) {

            lighton.removeClass('active');
            lightoff.addClass('active');

            TweenLite.fromTo(lightoff, 2, {
                y: 100,
                ease: 'Elastic.easeOut',
                onComplete: function() {

                    TweenLite.to(backgroundon, .17, {
                        alpha: 0,
                        scaleX: 1,
                        scaleY: 1
                    });

                    TweenLite.fromTo(lighton, 0.1, {
                        y: 100,
                        ease: 'Elastic.easeOut',
                        alpha: 1
                    }, {
                        y: 0,
                        ease: 'Elastic.easeOut',
                        alpha: 0
                    })
                }
            }, {
                y: 0,
                ease: 'Elastic.easeOut'
            });
        }

    });

    //brightness control
    watch.dblclick(function() {
        TweenLite.set(backgroundon, {
            alpha: 0
        });
        TweenLite.set(lightoff, {
            alpha: 0
        });
        TweenLite.set(lighton, {
            alpha: 0
        });
        default1.removeClass('blur');
        hotspot1.removeClass('disable');
    });


    var initY = 0;
    var deltaY = 0;
    var mouseDown = false;

    watch.on('pointerstart', function(e) {
        initY = e.pointer.y;
        mouseDown = true;
        deltaY = 0;
    });

    watch.on('pointermove', function(e) {
        e.preventDefault();

        if (mouseDown) {
            if (backgroundon.alpha != 0) {

                //get delta
            deltaY = e.pointer.y - initY;
            console.log(deltaY);

            //calculate the opacity
            var opacity = (150 - Math.abs(deltaY)) / 100;


            //position the digit
            TweenLite.set(backgroundon, {
                alpha: opacity
            });
            }
            
        }
    });

    //reload
    reset.click(function() {
        location.reload();
    });

});
