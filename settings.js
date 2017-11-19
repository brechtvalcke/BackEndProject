
module.exports = {

    jwt: {
        secret: "jsvbaTVX2SBE9xvPPc5gPpaGXrfr0g2BQyf7sZaGQIqJ73JL4v8QFaUky1yVPqQc2H7FJ7rpu08yxoDL2Zg1DbezWrh1swVieQj0xwgMFfmReWJJazF6PjIFWkGlcatiJUKv5z1O53HSfuOBeRIhHBz2D2zeeVUcNNIAiCIUSMI1AggMWIVSa25PCqB9kXRrNEQSo5qoaYjgrllQEASO2SqtQmKjQ6eQcEYxefNTPn1I4F2Gi7zYzA953JDx7Nc8wbFwMCKIx4tL64iVWb4ekm8SWVHhMQ9nGpG2UJNtrItJJ1pHuy6X5z64uhX6ek9Vf0r4VSkVXpXaUpnttb3iB5n4lOpQNRuEAkUv1w3iIBws2OtLs3nh3IhR54qeDCpkJtw4w0sn0hYoGprKUkivmBk37244hYfmQGQ8aaJgzv4Ptf85MbelYTaAbIBARSF9NcXaVrgaupFDpxW6VCG3YQ78GIT1TRLSbOFUCrhStP0xVXh4M5ax2m5hOS2KgkcxyRHJvFY2xYbWiLzKjipSvtZ2KfOZlbK3IeWOjgwt44qYuhxaObLE85FxlYNcmtBzhnXvgolPbgT2nAofAAQeAUzKw2K7FMK4ehQAOvAQ8nmGnv53XYcCVEPYVYeRi1DmOGuGTmiOsQG3A1GLFFHX26FWuYkgq5HWffGnAKzpHp29gslhLtVesfqgwV9NWBBxZwmuBNeBZBcyMExKs2hFMsGku60rxLQJ4Tp8uZKEjJU5TZfY1qZGuQ0AVh8lYI1aTlXYpO0eMehesKme3STMKJHsoPAfKoHThYQz1RMUZA56izc9IRtmnxBw2QVNKyobIocnleIHDn6v2vR6fOjnhFBGsrxAJyUGJTu2AKxRQ5gJQVRXFFfOqnVTM7YGwGK0LKR6wtoJfGri0gbnqqQrZEI4s5zaj3s97g8N1nKEGUmCbfYwDEcLj2ON6vqE8GRCDFPiBOhSmQHRk4VCD33r9usLFkPSZvYo4Zo3wc4i5Gas40FBaDDgTUc0J44J2YMa",
        tokenHeader: "token",
    },
    stringIDgenerator: {
        length: 12
    },
    mongoDb :{
        username: "MeetMe",
        password: "nXhpkTPoQmpJsWPS",
        getConnectionString: function(){
           return "mongodb://"+this.username+":"+ this.password +"@meetme-shard-00-00-u195e.mongodb.net:27017,meetme-shard-00-01-u195e.mongodb.net:27017,meetme-shard-00-02-u195e.mongodb.net:27017/test?ssl=true&replicaSet=MeetMe-shard-0&authSource=admin"
        } 
    }
};