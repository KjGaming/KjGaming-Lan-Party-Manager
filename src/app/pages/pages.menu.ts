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
                path: 'chat',
                data: {
                    menu: {
                        title: 'Chat',
                        icon: 'chat',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 91,
                    }
                }
            },
            {
                path: 'textBox',
                data: {
                    menu: {
                        title: 'Textbox',
                        icon: 'message',
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
            {
                path: 'admin',
                data: {
                    menu: {
                        title: 'Admin',
                        icon: 'settings',
                        iconClass: 'material-icons',
                        selected: false,
                        expanded: false,
                        order: 0,
                        isAdmin: true
                    }
                },
                children: [
                    {
                        path: 'news',
                        data: {
                            menu: {
                                title: 'News',
                                icon: 'info',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'download',
                        data: {
                            menu: {
                                title: 'Download',
                                icon: 'file_download',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'server',
                        data: {
                            menu: {
                                title: 'Server',
                                icon: 'dns',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'event',
                        data: {
                            menu: {
                                title: 'Event',
                                icon: 'event',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'user',
                        data: {
                            menu: {
                                title: 'Member',
                                icon: 'person',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'catering',
                        data: {
                            menu: {
                                title: 'Catering',
                                icon: 'restaurant',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'tournament',
                        data: {
                            menu: {
                                title: 'Turnier',
                                icon: 'games',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'product',
                        data: {
                            menu: {
                                title: 'Produkte',
                                icon: 'local_bar',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'statistic',
                        data: {
                            menu: {
                                title: 'Statistik',
                                icon: 'insert_chart',
                                iconClass: 'material-icons',
                                selected: false,
                                expanded: false,
                                order: 0
                            }
                        }
                    },
                    {
                        path: 'sides',
                        data: {
                            menu: {
                                title: 'Seiten',
                                icon: 'menu',
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

