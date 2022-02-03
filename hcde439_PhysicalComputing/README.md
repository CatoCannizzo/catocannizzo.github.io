# HCDE 439 Physical Computing Winter 2021

**Instructor:** Nadya Peek

**Teaching assistant:** Brian Kinnee

ffmpeg -i YOURMOV.MP4 -r 15 -vf scale=720:-1 -ss 00:00:14 -to 00:00:19 tada.gif

##Multimeter##
Dont use the left most hole. Red to middle, black to right.

To measure current... well we wont but the multimeter has to be in series which... is hard

###Measure R ###
    Use yellow Olm setting on bottom left
    Multimeter is in parallel, this requires circuit disconnected from power 
    Set to closest above the 
    The twos don't matter, just the sig figs

###Measure V###
    Top Left V DC
    Need atleast two resistors

###Pins###
    14 GPIO (5 of these are ~ pins), 6 Analog Pins

    Analog pins measure voltage in
    0-5 V
    w/ fidelity of 0-1023 (nameless units)

###functions###
    Mapping only maps linear functions
        This is fine for us.



