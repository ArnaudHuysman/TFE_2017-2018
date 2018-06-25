export const maps = {
              "derivium" : {
                  "name" : "Derivium",
                  "difficulty" : "easy",
                  "cost" : 0,
                  "bought" : true,
                  "structure" : [
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                    [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                  ],
                  "colors": {
                    "ressource" : 0x16D4F0,
                    "base" : {r:17, g:29, b:74},
                    "second": {r:60, g:70, b:106}
                  },
                  "waves" : [
                    { "n" : 1, "time" : 90, "enemies" :[ {"type": "simple", "amount": 5, lifes: 1, speed : 0.6},
                                                          {"type": "big", "amount": 0, lifes: 5, speed : 0.6},
                                                          {"type": "shooting", "amount": 0, lifes: 2, speed : 1}
                                                        ]},
                    { "n" : 2, "time" : 90, "enemies" :[ {"type": "simple", "amount": 0, lifes: 2, speed : 0.6},
                                                          {"type": "big", "amount": 1, lifes: 5, speed : 0.5},
                                                          {"type": "shooting", "amount": 0, lifes: 2, speed : 1}
                                                        ]},
                    { "n" : 3, "time" : 120, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 2, "speed" : 0.6 },
                                                          {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                          {"type": "shooting", "amount": 2, "lifes": 2, "speed" : 1 }
                                                        ]},
                    { "n" : 4, "time" : 120, "enemies" :[ {"type": "simple", "amount": 10, "lifes": 2, "speed" : 0.7 },
                                                          {"type": "big", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                          {"type": "shooting", "amount": 0, "lifes": 2, "speed" : 1 }
                                                        ]},
                    { "n" : 5, "time" : 120, "enemies" :[ {"type": "simple", "amount": 10, "lifes": 2, "speed" : 0.7 },
                                                          {"type": "big", "amount": 0, "lifes": 6, "speed" : 0.5 },
                                                          {"type": "shooting", "amount": 4, "lifes": 2, "speed" : 1 }
                                                        ]},
                    { "n" : 5, "time" : 160, "enemies" :[ {"type": "simple", "amount": 20, "lifes": 2, "speed" : 0.7 },
                                                          {"type": "big", "amount": 2, "lifes": 2, "speed" : 0.5 },
                                                          {"type": "shooting", "amount": 2, "lifes": 3, "speed" : 1 }
                                                        ]}
                  ]
                },
                "talentium" : {
                    "name" : "Talentium",
                    "difficulty" : "impossible",
                    "cost" : 25,
                    "bought" : true,
                    "structure" : [
                      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                      [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                      [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                      [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                      [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                      [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                      [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                    ],
                    "colors": {
                      "ressource" : 0xF78154,
                      "base" : {r:242, g:193, b:78},
                      "second": {r:180, g:67, b:108}
                    },
                    "waves" : [
                      { "n" : 1, "time" : 40, "enemies" :[ {"type": "simple", "amount": 50, "lifes": 5, "speed" : 1.5 },
                                                            {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                            {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                          ]},
                      { "n" : 2, "time" : 180, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                            {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                            {"type": "shooting", "amount": 8, "lifes": 5, "speed" : 1.2 }
                                                          ]},
                    ]
                  },
                  "krypton" : {
                      "name" : "Krypton",
                      "difficulty" : "lexluthor",
                      "cost" : 50,
                      "bought" : true,
                      "structure" : [
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                        [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                        [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                        [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                        [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                      ],
                      "colors": {
                        "ressource" : 0x1CF400,
                        "base" : {r:24, g:155, b:109},
                        "second": {r:40, g:82, b:56}
                      },
                      "waves" : [
                        { "n" : 1, "time" : 120, "enemies" :[ {"type": "simple", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                            ]},
                        { "n" : 2, "time" : 180, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "big", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                            ]},
                        { "n" : 3, "time" : 240, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "shooting", "amount": 4, "lifes": 5, "speed" : 0.5 }
                                                            ]},
                        { "n" : 4, "time" : 300, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                            ]},
                        { "n" : 5, "time" : 420, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                              {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                            ]}
                      ]
                    },
                    "belgium" : {
                        "name" : "Belgium",
                        "difficulty" : "average",
                        "cost" : 100,
                        "bought" : true,
                        "structure" : [
                          [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0 ],
                          [ 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0 ],
                          [ 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0 ],
                          [ 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0 ],
                          [ 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                          [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]

                        ],
                        "colors": {
                          "ressource" : 0x141414,
                          "base" : {r:247, g:223, b:97},
                          "second": {r:219, g:63, b:65}
                        },
                        "waves" : [
                          { "n" : 1, "time" : 10, "enemies" :[ {"type": "simple", "amount": 50, "lifes": 5, "speed" : 0.1},
                                                                {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.1 },
                                                                {"type": "shooting", "amount": 20, "lifes": 5, "speed" : 0.1 }
                                                              ]},
                          { "n" : 2, "time" : 180, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "big", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                              ]},
                          { "n" : 3, "time" : 240, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "shooting", "amount": 4, "lifes": 5, "speed" : 0.5 }
                                                              ]},
                          { "n" : 4, "time" : 300, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                              ]},
                          { "n" : 5, "time" : 420, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                              ]}
                        ]
                      },
                      "delight" : {
                          "name" : "Delight",
                          "difficulty" : "hard",
                          "cost" : 150,
                          "bought" : true,
                          "structure" : [
                            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                            [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                            [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                            [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                            [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
                            [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
                            [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
                            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                          ],
                          "colors": {
                            "ressource" : 0xF6AE2D,
                            "base" : {r:17, g:29, b:74},
                            "second": {r:60, g:70, b:106}
                          },
                          "waves" : [
                            { "n" : 1, "time" : 120, "enemies" :[ {"type": "simple", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                ]},
                            { "n" : 2, "time" : 180, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "big", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                ]},
                            { "n" : 3, "time" : 240, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "shooting", "amount": 4, "lifes": 5, "speed" : 0.5 }
                                                                ]},
                            { "n" : 4, "time" : 300, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                ]},
                            { "n" : 5, "time" : 420, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                  {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                ]}
                          ]
                        },
                        "bloom" : {
                            "name" : "Bloom",
                            "difficulty" : "legendary",
                            "cost" : 250,
                            "bought" : true,
                            "structure" : [
                              [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 3, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
                              [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
                            ],
                            "colors": {
                              "ressource" : 0xF6AE2D,
                              "base" : {r:17, g:29, b:74},
                              "second": {r:60, g:70, b:106}
                            },
                            "waves" : [
                              { "n" : 1, "time" : 120, "enemies" :[ {"type": "simple", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                  ]},
                              { "n" : 2, "time" : 180, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "big", "amount": 1, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                  ]},
                              { "n" : 3, "time" : 240, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "shooting", "amount": 4, "lifes": 5, "speed" : 0.5 }
                                                                  ]},
                              { "n" : 4, "time" : 300, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                  ]},
                              { "n" : 5, "time" : 420, "enemies" :[ {"type": "simple", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "big", "amount": 0, "lifes": 5, "speed" : 0.5 },
                                                                    {"type": "shooting", "amount": 0, "lifes": 5, "speed" : 0.5 }
                                                                  ]}
                            ]
                          }
              }
