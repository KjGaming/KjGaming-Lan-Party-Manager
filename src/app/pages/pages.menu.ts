export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'news',
                data: {
                    menu: {
                        title: 'News',
                        icon: 'home',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 90,
                    }
                }
            },
            {
                path: 'memberlist',
                data: {
                    menu: {
                        title: 'Userlist',
                        icon: 'group',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'clan',
                data: {
                    menu: {
                        title: 'Clan',
                        icon: 'settings_input_svideo',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'seating',
                data: {
                    menu: {
                        title: 'Sitzplan',
                        icon: 'event_seat',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'timetable',
                data: {
                    menu: {
                        title: 'Zeitplan',
                        icon: 'event',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 92,
                    }
                }
            },
            {
                path: 'server',
                data: {
                    menu: {
                        title: 'Serverliste',
                        icon: 'dns',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'tournament',
                data: {
                    menu: {
                        title: 'Turniere',
                        icon: 'games',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'download',
                data: {
                    menu: {
                        title: 'Downloads',
                        icon: 'file_download',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'catering',
                data: {
                    menu: {
                        title: 'Verpflegung',
                        icon: 'restaurant',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'feedback',
                data: {
                    menu: {
                        title: 'Feedback',
                        icon: 'feedback',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            /*{
                path: 'editors',
                data: {
                    menu: {
                        title: 'Editors',
                        icon: '',
                        iconClass: 'ion-edit',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'ckeditor',
                        data: {
                            menu: {
                                title: 'CKEditor',
                            }
                        }
                    }
                ]
            },
            //{
            //  path: 'components',
            //  data: {
            //    menu: {
            //      title: 'Components',
            //      icon: 'ion-gear-a',
            //      selected: false,
            //      expanded: false,
            //      order: 250,
            //    }
            //  },
            //  children: [
            //    {
            //      path: 'treeview',
            //      data: {
            //        menu: {
            //          title: 'Tree View',
            //        }
            //      }
            //    }
            //  ]
            //},
            {
                path: 'charts',
                data: {
                    menu: {
                        title: 'Charts',
                        icon: '',
                        iconClass: 'ion-stats-bars',
                        selected: false,
                        expanded: false,
                        order: 200,
                    }
                },
                children: [
                    {
                        path: 'chartist-js',
                        data: {
                            menu: {
                                title: 'Chartist.Js',
                            }
                        }
                    }
                ]
            },
            {
                path: 'ui',
                data: {
                    menu: {
                        title: 'UI Features',
                        icon: '',
                        iconClass: 'ion-android-laptop',
                        selected: false,
                        expanded: false,
                        order: 300,
                    }
                },
                children: [
                    {
                        path: 'typography',
                        data: {
                            menu: {
                                title: 'Typography',
                            }
                        }
                    },
                    {
                        path: 'buttons',
                        data: {
                            menu: {
                                title: 'Buttons',
                            }
                        }
                    },
                    {
                        path: 'icons',
                        data: {
                            menu: {
                                title: 'Icons',
                            }
                        }
                    },
                    {
                        path: 'grid',
                        data: {
                            menu: {
                                title: 'Grid',
                            }
                        }
                    },
                ]
            },
            {
                path: 'forms',
                data: {
                    menu: {
                        title: 'Form Elements',
                        icon: '',
                        iconClass: 'ion-compose',
                        selected: false,
                        expanded: false,
                        order: 400,
                    }
                },
                children: [
                    {
                        path: 'inputs',
                        data: {
                            menu: {
                                title: 'Form Inputs',
                            }
                        }
                    },
                    {
                        path: 'layouts',
                        data: {
                            menu: {
                                title: 'Form Layouts',
                            }
                        }
                    }
                ]
            },
            {
                path: 'tables',
                data: {
                    menu: {
                        title: 'Tables',
                        icon: '',
                        iconClass: 'ion-grid',
                        selected: false,
                        expanded: false,
                        order: 500,
                    }
                },
                children: [
                    {
                        path: 'basictables',
                        data: {
                            menu: {
                                title: 'Basic Tables',
                            }
                        }
                    },
                    {
                        path: 'smarttables',
                        data: {
                            menu: {
                                title: 'Smart Tables',
                            }
                        }
                    }
                ]
            },
            {
                path: 'maps',
                data: {
                    menu: {
                        title: 'Maps',
                        icon: '',
                        iconClass: 'ion-ios-location-outline',
                        selected: false,
                        expanded: false,
                        order: 600,
                    }
                },
                children: [
                    {
                        path: 'googlemaps',
                        data: {
                            menu: {
                                title: 'Google Maps',
                            }
                        }
                    },
                    {
                        path: 'leafletmaps',
                        data: {
                            menu: {
                                title: 'Leaflet Maps',
                            }
                        }
                    },
                    {
                        path: 'bubblemaps',
                        data: {
                            menu: {
                                title: 'Bubble Maps',
                            }
                        }
                    },
                    {
                        path: 'linemaps',
                        data: {
                            menu: {
                                title: 'Line Maps',
                            }
                        }
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Pages',
                        icon: '',
                        iconClass: 'ion-document',
                        selected: false,
                        expanded: false,
                        order: 650,
                    }
                },
                children: [
                    {
                        path: ['/login'],
                        data: {
                            menu: {
                                title: 'Login'
                            }
                        }
                    },
                    {
                        path: ['/register'],
                        data: {
                            menu: {
                                title: 'Register'
                            }
                        }
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Menu Level 1',
                        icon: '',
                        iconClass: 'ion-ios-more',
                        selected: false,
                        expanded: false,
                        order: 700,
                    }
                },
                children: [
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'Menu Level 1.1',
                                url: '#'
                            }
                        }
                    },
                    {
                        path: '',
                        data: {
                            menu: {
                                title: 'Menu Level 1.2',
                                iconClass: '',
                                url: '#'
                            }
                        },
                        children: [
                            {
                                path: '',
                                data: {
                                    menu: {
                                        title: 'Menu Level 1.2.1',
                                        url: '#'
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'External Link',
                        url: 'http://akveo.com',
                        icon: '',
                        iconClass: 'ion-android-exit',
                        order: 800,
                        target: '_blank'
                    }
                }
            },*/
            {
                path: 'admin',
                data: {
                    menu: {
                        title: 'Admin',
                        icon: 'home',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 0,
                        isAdmin: true
                    }
                },
                children: [
                    {
                        path: 'settings',
                        data: {
                            menu: {
                                title: 'Settings',
                                icon: 'home',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    }
                ]
            }
        ]
    }

];

