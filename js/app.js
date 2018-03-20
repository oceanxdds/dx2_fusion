/*/////////////////////////////////////////////////
Dx2 Devil Fusion Emulator
Author: Robin Chiu
E-mail: oceanxdds@gmail.com
Github: https://github.com/oceanxdds/dx2_fusion
Publish: https://oceanxdds.github.io/dx2_fusion/
//////////////////////////////////////////////////*/

// Devil Data

var ddd = [
    {
        name:'大天使',
        formulas:[
            ['神獸','女神'],
            ['神獸','魔神'],
            ['聖獸','女神'],
            ['天使','女神'],
            ['天使','聖獸'],
            ['墮天使','聖獸']
        ],
        devils:[
            {   name:'メタトロン',       name_tw:'梅塔特隆', name_en:'Metatron',   rarity:5,   grade:99,  icon:'daitensi_metatoron.png'     },
            {   name:'ミカエル',        name_tw:'米迦勒',      rarity:5,    grade:90, icon:'daitensi_mikaeru.png'     },
            {   name:'アズラエル',      name_tw:'阿斯萊爾',    rarity:4,    grade:67, icon:'daitensi_azuraeru.png'            },
            {   name:'サンダルフォン',   name_tw:'聖達芬',     rarity:4,           grade:61, icon:'daitensi_sandaruhuon.png'         },
            {   name:'ライラ',          name_tw:'萊拉',    rarity:3,           grade:43, icon:'daitensi_raira.png'          }
        ]
    },
    {
        name:'女神',
        formulas:[
            //['靈鳥','大天使'],    //180323 add
            //['魔神','靈鳥'],      //180323 add
            ['聖獸','大天使'],
            ['聖獸','神獸'],
            //['幻魔','靈鳥'],      //180323 add
            ['地母神','魔神'],
            ['地母神','幻魔'],
            ['天使','大天使'],
            ['墮天使','天使'],
            ['鬼女','大天使'],
            ['鬼女','神獸'],
            ['鬼女','地母神'],
            ['鬼女','妖精']
        ],
        devils:[
            {                name:'ラクシュミ',         name_tw:'吉祥天',       rarity:5,                grade:85, icon:'megami_rakusyumi.png'            },
            {                name:'イシュタル',        name_tw:'伊絲塔',        rarity:5,                grade:82, icon:'megami_isyutaru.png'            },
            {                name:'サラスヴァティ',    name_tw:'妙音天女',            rarity:4,                grade:69, icon:'megami_sarasuvatei.png'            },
            {                name:'パラスアテナ',      name_tw:'帕拉斯雅典娜',          rarity:4,                grade:62, icon:'megami_parasuatena.png'            },
            {                name:'スカアハ',          name_tw:'斯卡哈',      rarity:3,                grade:50, icon:'megami_sukaaha.png'            },
            {                name:'アリアンロッド',     name_tw:'阿麗安蘿德',           rarity:3,                grade:44, icon:'megami_arianrodo.png'            },
            {                name:'ハトホル',          name_tw:'哈索爾',      rarity:2,                grade:27, icon:'megami_htohoru.png'            }
        ]
    },
    /*
    {
        name:'靈鳥',              //180323 add
        formulas:[
            ['神獸','大天使'],
            ['天使','神獸'],
            ['妖魔','女神'],
            ['魔獸','神獸'],
            ['妖精','龍王'],
            ['妖精','魔獸'],
            ['鬼女','聖獸'],
            ['夜魔','妖鬼'],
            ['邪神','夜魔'],
            ['妖獸','妖魔'],
            ['妖獸','龍王'],
            ['魔王','妖魔']
        ],
        devils:[
            {                name:'???',         name_tw:'???',       rarity:5,                grade:1, icon:''            }
        ]
    },
    */
    {
        name:'魔神',
        formulas:[
            ['女神','大天使'],
            //['靈鳥','女神'],      //180323 add
            ['神獸','大天使'],     //180323 remove
            ['破壞神','女神'],
            ['地母神','大天使'],
            ['魔獸','大天使'],
            ['墮天使','魔獸'],
            ['妖鬼','鬼神'],
            ['夜魔','墮天使'],
            ['邪神','神獸'],
            ['邪神','魔獸']
        ],
        devils:[
            {                name:'ヴィシュヌ',      name_tw:'毘濕奴',          rarity:5,                grade:97, icon:'majin_visyunu.png'            },
            {                name:'アマテラス',      name_tw:'天照',          rarity:5,                grade:82, icon:'majin_amaterasu.png'            },
            {                name:'オーディン',      name_tw:'奧丁',          rarity:4,                grade:73, icon:'majin_odein.png'            },
            {                name:'プロメテウス',    name_tw:'普羅米修斯',            rarity:4,                grade:67, icon:'majin_purometeusu.png'            },
            {                name:'ミトラ',         name_tw:'密特拉',       rarity:3,                grade:55, icon:'majin_mitora.png'            },
            {                name:'ホルス',         name_tw:'荷魯斯',       rarity:3,                grade:49, icon:'majin_horusu.png'            }
        ]
    },
    {
        name:'神獸',
        formulas:[
            ['聖獸','魔神'],
            ['地母神','聖獸'],
            ['龍王','幻魔'],
            ['魔獸','魔神'],
            ['魔獸','聖獸'],
            ['魔獸','破壞神'],
            ['夜魔','妖魔'],
            ['邪神','魔神'],
            //['妖獸','靈鳥'],      //180323 add
            ['妖獸','邪神'],
            ['外道','聖獸']
        ],
        devils:[
            {                name:'バロン',         name_tw:'巴隆',       rarity:5,                grade:84, icon:'sinjyuu_baron.png'            },
            {                name:'アヌビス',       name_tw:'阿努比斯',         rarity:4,                grade:70, icon:'sinjyuu_anubisu.png'            },
            {                name:'キマイラ',       name_tw:'奇美拉',         rarity:3,                grade:49, icon:'sinjyuu_kimaira.png'            },
            {                name:'マカミ',         name_tw:'真神',       rarity:3,                grade:41, icon:'sinjyuu_makami.png'            },
            {                name:'シーサー',       name_tw:'獅爺',         rarity:2,                grade:33, icon:'sinjyuu_sisa.png'            }
        ]
    },
    {
        name:'聖獸',
        formulas:[
            //['神獸','靈鳥'],      //180323 add
            ['破壞神','神獸'],
            ['鬼神','神獸'],
            ['天使','幻魔'],
            ['妖魔','破壞神'],
            ['魔獸','鬼神'],
            ['妖精','大天使'],
            ['妖精','天使'],
            ['妖精','妖魔'],
            ['夜魔','神獸'],
            ['夜魔','幻魔'],
            ['妖獸','女神'],
            ['幽鬼','妖精']
        ],
        devils:[
            {                name:'スフィンクス',     name_tw:'斯芬克斯',           rarity:4,                grade:76, icon:'seijyuu_sufuinkusu.png'            },
            {                name:'スレイプニル',     name_tw:'八腳天馬',           rarity:4,                grade:62, icon:'seijyuu_sureipuniru.png'            },
            {                name:'ビャッコ',         name_tw:'白虎',       rarity:3,                grade:48, icon:'seijyuu_byako.png'            },
            {                name:'アピス',           name_tw:'阿庇斯',     rarity:3,                grade:44, icon:'seijyuu_apisu.png'            },
            {                name:'ユニコーン',       name_tw:'獨角獸',         rarity:3,                grade:42, icon:'seijyuu_unicon.png'            },
            {                name:'へケト',           name_tw:'海奎特',     rarity:2,                grade:27, icon:'seijyuu_heketo.png'            }
        ]
    },
    {
        name:'幻魔',
        formulas:[
            ['魔神','女神'],
            ['地母神','神獸'],
            ['地母神','破壞神'],
            ['妖魔','魔神'],
            ['妖魔','地母神'],
            ['墮天使','妖魔'],
            ['邪神','地母神'],
            ['邪神','鬼神'],
            ['妖獸','鬼神'],
            ['妖獸','妖魔'],    //180323 remove
            ['外道','神獸'],
            ['外道','墮天使'],
            ['魔王','神獸'],
            ['魔王','地母神'],
            ['幽鬼','魔神']
        ],
        devils:[
            {                name:'クー・フーリン',    name_tw:'庫夫林',            rarity:5,                grade:81, icon:'genma_kuhurin.png'            },
            {                name:'ツクヨミ',          name_tw:'月讀',      rarity:4,                grade:67, icon:'genma_tukuyomi.png'            },
            {                name:'ハヌマーン',        name_tw:'哈奴曼',        rarity:4,                grade:60, icon:'genma_hanuman.png'            },
            {                name:'クルースニク',      name_tw:'克雷斯尼克',          rarity:3,                grade:49, icon:'genma_kurusuniku.png'            },
            {                name:'タム・リン',        name_tw:'塔姆林',        rarity:3,                grade:40, icon:'genma_tamurin.png'            },
            {                name:'クラマテング',      name_tw:'鞍馬天狗',          rarity:2,                grade:27, icon:'genma_muramatengu.png'           }
        ]
    },
    {
        name:'破壞神',
        formulas:[
            ['地母神','女神'],
            //['地母神','靈鳥'],    //180323 add
            ['鬼神','大天使'],
            ['鬼神','魔神'],
            ['天使','魔神'],
            ['天使','地母神'],
            ['龍王','魔神'],
            ['墮天使','魔神'],
            ['妖鬼','地母神'],
            ['邪神','女神'],
            ['魔王','魔神'],
            ['魔王','墮天使'],
            ['幽鬼','女神']
        ],
        devils:[
            {                name:'シヴァ',           name_tw:'濕婆',     rarity:5,                grade:93, icon:'hakaisin_siva.png'            },
            {                name:'スサノオ',         name_tw:'素盞嗚尊',       rarity:5,                grade:82, icon:'hakaisin_susanoo.png'            },
            {                name:'ホクトセイクン',    name_tw:'北斗星君',            rarity:4,                grade:69, icon:'hakaisin_hokutoseikun.png'            },
            {                name:'セイテンタイセイ',  name_tw:'齊天大聖',              rarity:4,                grade:61, icon:'hakaisin_seitentaisei.png'            },
            {                name:'アレス',           name_tw:'阿瑞斯',     rarity:3,                grade:44, icon:'hakaisin_aresu.png'            }
        ]
    },
    {
        name:'地母神',
        formulas:[
            //['聖獸','靈鳥'],      //180323 add
            ['破壞神','幻魔'],
            ['鬼神','女神'],
            //['鬼神','靈鳥'],      //180323 add
            ['鬼神','聖獸'],
            ['鬼神','破壞神'],
            ['墮天使','大天使'],
            ['妖鬼','破壞神'],
            ['鬼女','魔神'],
            ['鬼女','聖獸'],      //180323 remove
            ['鬼女','破壞神'],
            ['鬼女','鬼神'],
            ['邪神','夜魔'],      //180323 remove
            ['魔王','鬼女'],
            ['魔王','夜魔']
        ],
        devils:[
            {   name:'アシェラト',    name_tw:'亞舍拉',  rarity:5,        grade:83, icon:'tibosin_asyerato.png'            },
            {   name:'スカディ',      name_tw:'絲卡蒂',  rarity:4,        grade:67, icon:'tibosin_sukadei.png'             },
            {                name:'キクリヒメ',     name_tw:'菊理媛',           rarity:4,                grade:60, icon:'tibosin_kikurihime.png'            },
            {                name:'イシス',        name_tw:'伊西斯',        rarity:3,                grade:54, icon:'tibosin_isisu.png'            },
            {                name:'クシナビヒメ',   name_tw:'奇稻田姬',             rarity:3,                grade:47, icon:'tibosin_kusinabihime.png'            },
            {                name:'ペレ',          name_tw:'佩蕾',      rarity:3,                grade:40, icon:'tibosin_pere.png'            }
        ]
    },
    {
        name:'鬼神',
        formulas:[
            ['幻魔','神獸'],
            ['破壞神','聖獸'],
            //['破壞神,'靈鳥'],     //180323 add
            ['妖魔','女神'],        //180323 remove
            //['龍王','靈鳥'],      //180323 add
            ['龍王','聖獸'],
            //['妖鬼','靈鳥'],      //180323 add
            ['妖鬼','魔神'],
            ['妖鬼','神獸'],
            ['鬼女','龍王'],
            ['夜魔','地母神'],
            ['夜魔','妖鬼'],        //180323 remove
            ['邪神','龍王'],
            ['外道','魔神'],
            ['魔王','龍王']
        ],
        devils:[
            {                name:'トール',          name_tw:'索爾',      rarity:5,                grade:83, icon:'kisin_toru.png'            },
            {                name:'ショウキ',        name_tw:'鍾馗',        rarity:4,                grade:75, icon:'kisin_syouki.png'            },
            {                name:'ビシャモンテン',   name_tw:'毘沙門天',            rarity:4,                grade:70, icon:'kisin_bisyamonten.png'            },
            {                name:'ジコクテン',       name_tw:'持國天',         rarity:4,                grade:62, icon:'kisin_jikokuten.png'            },
            {                name:'コウモクテン',     name_tw:'廣目天',           rarity:3,                grade:50, icon:'kisin_koumokuten.png'            },
            {                name:'ゾウチョウテン',   name_tw:'增長天',             rarity:3,                grade:41, icon:'kisin_zoutyouten.png'            },
            {                name:'タケミナカタ',     name_tw:'建御名方',           rarity:2,                grade:27, icon:'kisin_takeminakata.png'            }
        ]
    },
    {
        name:'天使',
        formulas:[
            ['幻魔','女神'],
            ['妖魔','聖獸'],
            ['妖精','神獸'],
            ['墮天使','神獸'],
            ['墮天使','妖精'],
            ['鬼女','妖鬼'],
            ['夜魔','妖精'],
            ['夜魔','鬼女'],
            ['外道','大天使'],
            ['外道','龍王'],
            ['幽鬼','神獸'],
            ['幽鬼','聖獸']
        ],
        devils:[
            {                name:'ソロネ',         name_tw:'座天使',       rarity:4,                grade:60, icon:'tensi_sorone.png'            },
            {                name:'ドミニオン',     name_tw:'主天使',           rarity:3,                grade:53, icon:'tensi_dominion.png'            },
            {                name:'ヴァーチャー',    name_tw:'力天使',            rarity:3,                grade:47, icon:'tensi_vatya.png'            },
            {                name:'パワー',          name_tw:'能天使',      rarity:3,                grade:40, icon:'tensi_pawa.png'            },
            {                name:'プリンシパリティ',   name_tw:'權天使',             rarity:2,                grade:35, icon:'tensi_purinsiparitei.png'            },
            {                name:'アークエンジェル',   name_tw:'大天使',             rarity:2,                grade:25, icon:'tensi_akuenjyeru.png'            },
            {                name:'エンジェル',         name_tw:'天使',       rarity:2,                grade:20, icon:'tensi_enjyeru.png'            }
        ]
    },
    {
        name:'妖魔',
        formulas:[
            ['幻魔','聖獸'],
            ['鬼神','幻魔'],
            ['妖精','龍王'],        //180323 remove
            ['墮天使','幻魔'],
            ['妖鬼','天使'],
            //['邪神','靈鳥'],      //180323 add
            ['邪神','聖獸'],
            ['妖獸','幻魔'],
            ['外道','夜魔'],
            ['外道','破壞神'],
            ['魔王','幻魔'],
            ['幽鬼','天使']
        ],
        devils:[
            {                name:'ガネーシャ',     name_tw:'象頭神',           rarity:4,                grade:66, icon:'youma_ganesya.png'            },
            {                name:'イフリート',     name_tw:'伊弗利特',           rarity:3,                grade:52, icon:'youma_ihurito.png'            },
            {                name:'ヴァルキリー',   name_tw:'女武神',             rarity:3,                grade:40, icon:'youma_varukiri.png'            },
            {                name:'ディース',       name_tw:'迪絲',         rarity:2,                grade:34, icon:'youma_deisu.png'            },
            {                name:'アプサラス',     name_tw:'飛天女神',           rarity:1,                grade:11, icon:'youma_apusarasu.png'            },
            {                name:'コッパテング',   name_tw:'木葉天狗',             rarity:1,                grade:7, icon:'youma_kopatengu.png'            },
            {                name:'アガシオン',     name_tw:'阿珈席翁',          rarity:1,                grade:5, icon:'youma_agasion.png'            }
        ]
    },
    {
        name:'龍王',
        formulas:[
            //['天使','靈鳥'],      //180323 add
            ['天使','神獸'],        //180323 remove
            ['妖魔','幻魔'],
            ['魔獸','神獸'],        //180323 remove
            ['妖精','聖獸'],
            ['妖精','幻魔'],
            //['墮天使','靈鳥'],    //180323 add
            ['妖鬼','墮天使'],
            ['夜魔','天使'],
            ['外道','幻魔'],
            ['外道','妖魔'],
            ['魔王','破壞神'],
            ['魔王','外道'],
            ['幽鬼','鬼神']
        ],
        devils:[
            {                name:'アナンタ',      name_tw:'阿南塔',          rarity:5,                grade:83, icon:'ryuuou_ananta.png'            },
            {                name:'ユルング',      name_tw:'虹蛇',          rarity:4,                grade:70, icon:'ryuuou_yurungu.png'            },
            {                name:'ヤマタノオロチ',    name_tw:'八岐大蛇',            rarity:4,                grade:61, icon:'ryuuou_yamatanooroti.png'            },
            {                name:'ゲンブ',        name_tw:'玄武',        rarity:3,                grade:45, icon:'ryuuou_genbu.png'            },
            {                name:'ナーガ',        name_tw:'那迦',        rarity:2,                grade:28, icon:'ryuuou_naga.png'            },
            {                name:'ノズチ',        name_tw:'野槌',        rarity:1,                grade:15, icon:'ryuuou_nozuti.png'            }
        ]
    },
    {
        name:'魔獸',
        formulas:[
            ['龍王','大天使'],
            ['龍王','神獸'],
            ['墮天使','鬼神'],
            ['墮天使','龍王'],
            ['妖鬼','幻魔'],
            ['妖鬼','龍王'],
            ['妖獸','神獸'],
            ['妖獸','夜魔'],
            ['外道','妖獸'],
            ['魔王','聖獸'],
            //['幽鬼','靈鳥'],      //180323 add
            ['幽鬼','破壞神'],
            ['幽鬼','魔王']
        ],
        devils:[
            {                name:'ケルベロス',     name_tw:'地獄犬',           rarity:4,                grade:61, icon:'majyuu_keruberosu.png'            },
            {                name:'アーマーン',     name_tw:'阿米特',           rarity:3,                grade:44, icon:'majyuu_aman.png'            },
            {                name:'オルトロス',     name_tw:'雙頭犬',           rarity:2,                grade:35, icon:'majyuu_orutorosu.png'            },
            {                name:'ネコマタ',       name_tw:'貓怪',         rarity:1,                grade:14, icon:'majyuu_nekomata.png'            },
            {                name:'イヌガミ',       name_tw:'犬神',         rarity:1,                grade:9, icon:'majyuu_inugami.png'            },
            {                name:'カーシー',       name_tw:'犬妖',         rarity:1,                grade:3, icon:'majyuu_kasi.png'            }
        ]
    },
    {
        name:'妖精',
        formulas:[
            ['妖魔','神獸'],
            ['妖魔','天使'],
            ['龍王','女神'],
            ['龍王','天使'],
            ['魔獸','幻魔'],
            ['鬼女','女神'],
            ['夜魔','聖獸'],
            ['夜魔','龍王'],
            ['夜魔','魔獸'],
            ['妖獸','天使'],
            ['妖獸','妖鬼'],
            ['外道','鬼神']
            //['魔王','靈鳥'],      //180323 add
        ],
        devils:[
            {                name:'オペロン',        name_tw:'奧伯隆',        rarity:4,                grade:67, icon:'yousei_oberon.png'            },
            {                name:'ティターニア',    name_tw:'提泰妮婭',            rarity:4,                grade:62, icon:'yousei_teitania.png'            },
            {                name:'セタンタ',        name_tw:'瑟坦特',        rarity:3,                grade:47, icon:'yousei_setanta.png'           },
            {                name:'シルキー',        name_tw:'希路奇',        rarity:3,                grade:42, icon:'yousei_siruki.png'            },
            {                name:'ケルピー',        name_tw:'凱爾皮',        rarity:2,                grade:35, icon:'yousei_kerupi.png'            },
            {                name:'ハイピクシー',      name_tw:'高等皮克希',          rarity:2,                grade:24, icon:'yousei_hiipikusi.png'            },
            {                name:'ジャックランタン',  name_tw:'燈籠傑克',              rarity:1,                grade:13, icon:'yousei_jyakurantan.png'            },
            {                name:'ジャックフロスト',  name_tw:'冰霜傑克',              rarity:1,                grade:7, icon:'yousei_jyakufurosuto.png'            },
            {                name:'ピクシー',         name_tw:'皮克希',       rarity:1,                grade:2, icon:'yousei_pikusi.png'            }
        ]
    },
    {
        name:'墮天使',
        formulas:[
            ['魔神','大天使'],
            ['魔獸','天使'],
            ['魔獸','妖魔'],
            ['妖鬼','魔獸'],
            ['夜魔','大天使'],
            ['夜魔','女神'],
            ['邪神','幻魔'],
            ['邪神','天使'],
            ['妖獸','鬼女'],
            ['外道','女神'],
            ['外道','天使'],
            ['幽鬼','大天使']
        ],
        devils:[
            {                name:'サマエル',       name_tw:'薩麥爾',         rarity:5,                grade:84, icon:'datensi_samaeru.png'            },
            {                name:'ダンタリアン',   name_tw:'但他林',             rarity:4,                grade:70, icon:'datensi_dantarian.png'            },
            {                name:'オセ',          name_tw:'歐賽',      rarity:3,                grade:54, icon:'datensi_ose.png'            },
            {                name:'フォルネウス',   name_tw:'佛鈕司',             rarity:3,                grade:41, icon:'datensi_huoruneosu.png'            },
            {                name:'デカラビア',     name_tw:'丹卡拉比',           rarity:2,                grade:23, icon:'datensi_dekarabia.png'            },
            {                name:'エリゴール',     name_tw:'埃力格',           rarity:1,                grade:10, icon:'datensi_erigoru.png'            },
            {                name:'メルコム',       name_tw:'梅爾克',         rarity:1,                grade:4, icon:'datensi_merukomu.png'            }
        ]
    },
    {
        name:'妖鬼',
        formulas:[
            ['妖魔','大天使'],
            ['魔獸','龍王'],
            ['妖精','破壞神'],
            ['妖精','鬼神'],
            //['鬼女','靈鳥'],      //180323 add
            ['鬼女','妖魔'],
            ['邪神','妖精'],
            ['邪神','墮天使'],
            ['邪神','鬼女'],
            ['妖獸','聖獸'],
            ['幽鬼','龍王'],
            ['幽鬼','墮天使'],
            ['幽鬼','外道']
        ],
        devils:[
            {                name:'オンギョウキ',     name_tw:'隱形鬼',           rarity:4,                grade:68, icon:'youki_ongyouki.png'            },
            {                name:'ベルセルク',       name_tw:'狂戰士',         rarity:3,                grade:54, icon:'youki_beruseruku.png'            },
            {                name:'シキオウジ',       name_tw:'式王子',         rarity:3,                grade:49, icon:'youki_sikiouji.png'            },
            {                name:'ヨモツイクサ',     name_tw:'黃泉軍',           rarity:3,                grade:41, icon:'youki_yomotuikusa.png'            },
            {                name:'オ二',            name_tw:'鬼',    rarity:2,                grade:27, icon:'youki_oni.png'            },
            {                name:'モムノフ',         name_tw:'桃生',       rarity:1,                grade:15, icon:'youki_momunohu.png'            },
            {                name:'アズミ',          name_tw:'安曇神',      rarity:1,                grade:3, icon:'youki_azumi.png'            }
        ]
    },
    {
        name:'鬼女',
        formulas:[
            ['妖魔','鬼神'],
            ['龍王','地母神'],
            ['龍王','鬼神'],
            //['魔獸','靈鳥'],      //180323 add
            ['魔獸','地母神'],
            ['墮天使','女神'],
            ['妖鬼','女神'],
            ['妖鬼','聖獸'],
            ['妖鬼','妖魔'],
            //['夜魔','靈鳥'],      //180323 add
            ['夜魔','鬼神'],
            ['幽鬼','幻魔'],
            ['幽鬼','夜魔']
        ],
        devils:[
            {                name:'ランダ',          name_tw:'讓特',     rarity:4,                grade:67, icon:'kijyo_randa.png'            },
            {                name:'ダーキニー',      name_tw:'荼吉尼',          rarity:3,                grade:53, icon:'kijyo_dakini.png'            },
            {                name:'マーメイド',      name_tw:'美人魚',          rarity:3,                grade:42, icon:'kijyo_mameido.png'            },
            {                name:'ヤクシニー',      name_tw:'夜叉女',          rarity:2,                grade:34, icon:'kijyo_yakusini.png'            },
            {                name:'ヨモツシコメ',    name_tw:'黃泉醜女',            rarity:2,                grade:23, icon:'kijyo_yomotusikome.png'            },
            {                name:'リャナンシー',    name_tw:'菈南希',            rarity:1,                grade:12, icon:'kijyo_ryanansi.png'            }
        ]
    },
    {
        name:'夜魔',
        formulas:[
            ['天使','鬼神'],
            //['妖魔','靈鳥'],      //180323 add
            ['龍王','妖魔'],
            //['妖精','靈鳥'],      //180323 add
            ['妖精','魔神'],
            ['墮天使','地母神'],
            ['妖鬼','妖精'],
            ['鬼女','幻魔'],
            ['妖獸','魔神'],
            ['妖獸','龍王'],      //180323 remove
            ['妖獸','墮天使'],
            ['魔王','妖魔'],      //180323 remove
            ['魔王','妖精'],
            ['魔王','妖獸'],
            ['幽鬼','妖獸']
        ],
        devils:[
            {                name:'リリス',        name_tw:'莉莉絲',        rarity:5,                grade:80, icon:'yoma_ririsu.png'            },
            {                name:'サキュバス',    name_tw:'女夢魔',            rarity:4,                grade:63, icon:'yoma_sakyubasu.png'            },
            {                name:'リリム',        name_tw:'莉莉姆',        rarity:3,                grade:47, icon:'yoma_ririmu.png'            },
            {                name:'キオン',        name_tw:'迦溫',        rarity:3,                grade:42, icon:'yoma_kiun.png'            },
            {                name:'フォーモリア',   name_tw:'弗莫爾',             rarity:2,                grade:30, icon:'yoma_huomoria.png'            },
            {                name:'インキュバス',   name_tw:'男夢魔',             rarity:2,                grade:21, icon:'yoma_inkyubasu.png'            },
            {                name:'ザントマン',     name_tw:'睡魔',           rarity:1,                grade:10, icon:'yoma_zandoman.png'            },
            {                name:'モコイ',         name_tw:'惡靈',       rarity:1,                grade:5, icon:'yoma_mokoi.png'            }
        ]
    },
    {
        name:'邪神',
        formulas:[
            ['天使','破壞神'],
            ['妖獸','魔獸'],
            ['外道','地母神'],
            ['魔王','天使'],
            ['魔王','魔獸']
        ],
        devils:[
            {                name:'セト',         name_tw:'賽特',       rarity:5,                grade:84, icon:'jyasin_seto.png'            },
            {                name:'ギリメカラ',    name_tw:'獨眼魔象',            rarity:4,                grade:67, icon:'jyasin_girimekara.png'            },
            {                name:'パズス',        name_tw:'帕祖祖',        rarity:4,                grade:62, icon:'jyasin_pazusu.png'            },
            {                name:'アラハバキ',    name_tw:'荒霸吐',            rarity:3,                grade:50, icon:'jyasin_arahabaki.png'            },
            {                name:'バフォメット',  name_tw:'巴風特',              rarity:3,                grade:41, icon:'jyasin_bahuometo.png'            },
            {                name:'アブラクサス',  name_tw:'亞布拉薩',              rarity:2,                grade:26, icon:'jyasin_aburakusasu.png'            }
        ]
    },
    {
        name:'妖獸',
        formulas:[
            ['幻魔','大天使'],
            ['妖精','魔獸'],        //180323 remove
            ['妖鬼','大天使'],
            ['鬼女','墮天使'],
            ['夜魔','魔神'],
            ['邪神','妖魔'],
            //['外道','靈鳥'],      //180323 add
            ['外道','魔獸'],
            ['外道','妖鬼'],
            ['外道','鬼女'],
            ['魔王','大天使'],
            ['幽鬼','地母神'],
            ['幽鬼','妖魔'],
            ['幽鬼','魔獸']
        ],
        devils:[
            {                name:'フェンリル',    name_tw:'芬里爾',            rarity:4,                grade:61, icon:'youjyuu_huenriru.png'            },
            {                name:'ピアレイ',     name_tw:'皮亞雷',           rarity:3,                grade:46, icon:'youjyuu_piarei.png'            },
            {                name:'モスマン',     name_tw:'天蛾人',           rarity:3,                grade:41, icon:'youjyuu_mosuman.png'            },
            {                name:'ヌエ',         name_tw:'鵺',       rarity:2,                grade:25, icon:'youjyuu_nue.png'            },
            {                name:'ライジュウ',    name_tw:'雷獸',            rarity:2,                grade:20, icon:'youjyuu_raijyuu.png'            },
            {                name:'バイコーン',    name_tw:'雙角獸',            rarity:1,                grade:9, icon:'youjyuu_baikon.png'            },
            {                name:'チャグリン',    name_tw:'恰古林',            rarity:1,                grade:4, icon:'youjyuu_tyagurinn.png'            }
        ]
    },
    {
        name:'外道',
        formulas:[
            ['妖精','地母神'],
            ['鬼女','天使'],
            ['鬼女','魔獸'],
            ['夜魔','破壞神'],
            ['妖獸','妖精'],
            ['幽鬼','妖鬼'],
            ['幽鬼','鬼女'],
            ['幽鬼','邪神']
        ],
        devils:[
            {                name:'マッドガッサー',     name_tw:'毒氣怪客',           rarity:3,                grade:45, icon:'gedou_madogasa.png'            },
            {                name:'シャドウ',          name_tw:'黑影',      rarity:2,                grade:35, icon:'gedou_syadou.png'            },
            {                name:'ブラックウーズ',    name_tw:'黑泥怪',            rarity:2,                grade:25, icon:'gedou_burakuuzu.png'            },
            {                name:'ブロブ',           name_tw:'果凍怪',     rarity:2,                grade:20, icon:'gedou_burobu.png'            },
            {                name:'ファントム',       name_tw:'鬼魅',         rarity:1,               grade:10, icon:'gedou_huantomu.png'            },
            {                name:'スライム',        name_tw:'軟泥怪',        rarity:1,                grade:1, icon:'gedou_suraimu.png'            }
        ]
    },
    {
        name:'魔王',
        formulas:[
            ['幻魔','魔神'],
            ['破壞神','大天使'],
            ['破壞神','魔神'],
            ['鬼神','地母神'],
            ['龍王','破壞神'],
            ['墮天使','破壞神'],
            ['邪神','破壞神']
        ],
        devils:[
            {                name:'ルシファー',     name_tw:'露西法',           rarity:5,                grade:98, icon:'maou_rusifua.png'            },
            {                name:'マーラ',         name_tw:'魔羅',       rarity:5,                grade:90, icon:'maou_mara.png'            },
            {                name:'スルト',         name_tw:'史爾特爾',      rarity:5,                grade:83, icon:'maou_suruto.png'            },
            {                name:'ロキ',           name_tw:'洛基',     rarity:4,                grade:75, icon:'maou_roki.png'           },
            {                name:'ベルゼブブ',     name_tw:'別西卜',           rarity:4,                grade:68, icon:'maou_beruzebubu.png'            },
            {                name:'アバドン',       name_tw:'阿巴頓',         rarity:4,                grade:60, icon:'maou_abadon.png'            },
            {                name:'オーカス',       name_tw:'奧迦斯',         rarity:3,                grade:46, icon:'maou_okasu.png'            }
        ]
    },
    {
        name:'幽鬼',
        formulas:[
            ['魔獸','女神'],
            ['妖精','女神'],
            ['邪神','大天使'],
            ['邪神','妖鬼'],
            ['妖獸','大天使'],
            ['妖獸','破壞神'],
            ['妖獸','地母神'],
            ['外道','妖精'],
            ['外道','邪神'],
            ['魔王','女神'],
            ['魔王','鬼神'],
            ['魔王','妖鬼'],
            ['魔王','邪神']
        ],
        devils:[
            {                name:'ヴェータラ',        name_tw:'毘陀羅',        rarity:3,                grade:55, icon:'yuuki_vetara.png'            },
            {                name:'ラフィン・スカル',   name_tw:'笑面骷髏',             rarity:3,                grade:44, icon:'yuuki_rahuinsukaru.png'            },
            {                name:'レギオン',          name_tw:'惡靈軍團',      rarity:2,                grade:34, icon:'yuuki_region.png'            },
            {                name:'ピシャーチャ',      name_tw:'畢舍遮',          rarity:2,                grade:26, icon:'yuuki_pisyatya.png'            },
            {                name:'モウリョウ',        name_tw:'魍魎',        rarity:2,                grade:20, icon:'yuuki_mouryou.png'            },
            {                name:'オバリヨン',        name_tw:'背負小鬼',        rarity:1,                grade:7, icon:'yuuki_obariyon.png'            },
            {                name:'ガキ',             name_tw:'餓鬼',   rarity:1,                grade:4, icon:'yuuki_gaki.png'            }
        ]
    }
];

var Devil = function(devil){
    
    this.name = devil.name;
    this.name_tw = devil.name_tw;
    this.name_en = devil.name_en;
    this.rarity = devil.rarity;
    this.grade = devil.grade;
    this.icon = devil.icon;
};

Devil.prototype.showName = function(){
    
    var name;
            
    switch(i18n.locale){
        case 'ja': name = this.name; break;
        case 'tw': name = this.name_tw; break;
        case 'en': name = this.name_en; break;
        default: name = this.name;
    }
    if(!name)
        name = this.name;

    return name;
}

Devil.prototype.showGrade = function(){
    
    return 'G.'+this.grade;
}

Devil.prototype.fission_formulas = function(){
    
    var devil = this;
    
    var formulas = [];
  
    this.race.formulas.forEach(function(f){

        var r1 = f[0];
        var r2 = f[1];

        var boms = [];

        r1.devils.forEach(function(d1){
            r2.devils.forEach(function(d2){

                var bom = DevilBom.bom(devil,d1,d2);

                if(bom)
                    boms.push(bom);
            });
        });

        boms.sort(function(bom1,bom2){
            return bom1.order - bom2.order;
        });

        if(boms.length>0){
            formulas.push({
                'name': r1.name + ' x ' + r2.name,
                'boms':boms
            });
        }

    });

    return formulas;
}

Devil.prototype.fusion_formulas = function(){

    var d1 = this;
    var multi_formulas = [];

    // Target Race Loop
    this.race.usage.forEach(function(u){

        // Target Devil Loop
        u.target.devils.forEach(function(target){

            var formulas = [];
           
            u.r2s.forEach(function(r2){

                var boms = [];

                // Pair Devil Loop
                r2.devils.forEach(function(d2){

                    var bom = DevilBom.bom(target, d1, d2);

                    if(bom)
                        boms.push(bom)
                });

                boms.sort(function(c1,c2){
                    return c1.order - c2.order;
                });

                if(boms.length>0){

                    formulas.push({
                        'name': d1.race.name + ' x ' + r2.name,
                        'boms': boms
                    });
                }
            });
            
            if(formulas.length>0){
                multi_formulas.push({
                    devil:target,
                    formulas:formulas
                });
            }
        });

    });

    return multi_formulas;
}

var Race = function(race){
    
    this.name = race.name;
    this.formulas = race.formulas;
    this.devils = race.devils;
}

Race.prototype.showName = function(){

    var name;
            
    switch(i18n.locale){
        case 'ja': name = this.name; break;
        case 'tw': name = this.name_tw; break;
        case 'en': name = this.name_en; break;
        default: name = this.name;
    }
    if(!name)
        name = this.name;
    return name;
}


function DevilBom(devil, d1, d2){

    this.devil = devil;
    this.child1 = d1==null?null:new DevilBom(d1);
    this.child2 = d2==null?null:new DevilBom(d2);
    this.order = 0;
    this.upgrade = false;
    this.downgrade = false;
    this.mag = 0;
    this.mag_pure = 0;
    
    this.init();
}

DevilBom.prototype.set = function(bom){

    this.child1 = bom.child1;
    this.child2 = bom.child2;
    this.order = bom.order;
    this.upgrade = bom.upgrade;
    this.downgrade = bom.downgrade;
    this.mag = bom.mag;
    this.mag_pure = bom.mag_pure;
}

DevilBom.prototype.unset = function(){

    this.child1 = null;
    this.child2 = null;
    this.order = 0;
    this.upgrade = false;
    this.downgrade = false;
    this.mag = 0;
    this.mag_pure = 0;
}

DevilBom.prototype.init = function(){

    if(this.child1 && this.child2){

        var devil = this.devil;
        var d1 = this.child1.devil;
        var d2 = this.child2.devil;
        
        this.order = (d1.rarity>d2.rarity) 
            ? (d1.rarity*10+d2.rarity) 
            : (d2.rarity*10+d1.rarity);
        this.upgrade = (d1.rarity < devil.rarity && d2.rarity < devil.rarity);
        this.downgrade = (d1.rarity > devil.rarity || d2.rarity > devil.rarity);

        var g = (d1.grade + d2.grade)/2;
        var A = B = 0;
        var r = (devil.rarity*2)-d1.rarity-d2.rarity;

        A = [
            //-1 ~ 4
            [5,     5,          5,          5,          5,          5],
            [5,     5,          25,         50,         0,          0],
            [250,   500,        2500,       5000,       5200,       5400],
            [0,     6000,       150000,     300000,     320000,     0],
            [0,     60000,      1500000,    3000000,    4200000,    0]
        ][devil.rarity-1][r+1];

        B = [0,0,0.3,0.45,60,75,1080,1260,14400,16200][Math.floor(devil.grade/10)];

        var mag = A + (devil.grade-g) * B;
        
        this.mag = Math.floor(mag);
    
        if(devil.rarity==5)         this.mag_pure = Math.floor(mag*0.7);
        else if(devil.rarity==4)    this.mag_pure = Math.floor(mag*0.5);
        else                        this.mag_pure = this.mag;

        if( A==0 ){
            this.mag = 0;
            this.mag_pure = 0;
        }
    }
    else{
        this.order = 0;
        this.upgrade = false;
        this.downgrade = false;
        this.mag = 0;
        this.mag_pure = 0;
    }
};

DevilBom.prototype.showMag = function(isPure=true){

    return (this.mag/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


DevilBom.prototype.showMagPure = function(){

    return (this.mag_pure/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

DevilBom.prototype.caculate_mag = function(layer){

    var mag = this.mag;
    var mag1 = (this.child1?this.child1.caculate_mag(layer+1):0);
    var mag2 = (this.child2?this.child2.caculate_mag(layer+1):0);
    
    if(layer==1){
        if(mag1>mag2){  mag += mag1 + (this.child2?this.child2.caculate_mag_pure():0);   }
        else{           mag += (this.child1?this.child1.caculate_mag_pure():0) + mag2;   }
    }
    else{               mag += mag1 + mag2;                                   }

    return mag;
};

DevilBom.prototype.caculate_mag_pure = function(){

    return this.mag_pure 
        + (this.child1?this.child1.caculate_mag_pure():0)
        + (this.child2?this.child2.caculate_mag_pure():0);
};

DevilBom.prototype.showTotalMag = function(){

    var mag = this.caculate_mag(1);

    return (mag/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

DevilBom.prototype.showTotalMagPure = function(){

    var mag_pure = this.caculate_mag_pure();

    return (mag_pure/1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

DevilBom.bom = function(devil, d1, d2){

    var g = (d1.grade + d2.grade)/2;

    if( ! (devil.min <= g && g < devil.max ) ){
        return null;
    }
    
    if( app.allow_down_grade==0 && (d1.rarity>devil.rarity||d2.rarity>devil.rarity)){
        return null;
    }

    return new DevilBom(devil, d1, d2);
}

// Initialize

var race_data = {};
var devil_data = [];

// build race_data

ddd = ddd.map(function(r){
    
    r.devils = r.devils.map(function(d){
        return new Devil(d);
    });
    race_data[r.name] = r;
    return new Race(r);

});

ddd.forEach(function(r){

    r.formulas.forEach(function(f){
        f[0] = race_data[f[0]];
        f[1] = race_data[f[1]];
    });

});

ddd.forEach(function(r1){

    r1.devils.forEach(function(d, idx){

        d.race = r1;
        d.max = d.grade;
        d.min = (idx==r1.devils.length-1 ? 0 : r1.devils[idx+1].grade);
        devil_data.push(d);
    });

    var usage_temp = {};

    ddd.forEach(function(target){

        target.formulas.forEach(function(f){
            
            var r2 = null;

            if(f[0].name==r1.name){
                r2 = f[1];
            }
            if(f[1].name==r1.name){
                r2 = f[0];
            }
            if(r2){

                if(! (target.name in usage_temp)){
                    usage_temp[target.name] = [];
                }

                usage_temp[target.name].push(r2);
            }
        });
    });

    r1.usage = [];

    for(name in usage_temp){
        r1.usage.push({
            target:race_data[name],
            r2s:usage_temp[name]
        })
    }
});

function setCookie(name,value)
{
    var Days = 365;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
// Ready translated locale messages
const messages = {
    en: {
      message: {
        reverse:'Reverse',
        normal:'Normal',
        reverse_fusion: 'Reverse Fusion',
        normal_fusion: 'Normal Fusion',
        devil: 'Devil',
        setting:'Setting',
        language: 'Language',
        downgrade_fusion: 'Downgrade Fusion',
        allow: 'Allow',
        deny: 'Deny',
        search:'Search'
      }
    },
    ja: {
      message: {
        reverse:'逆引き',
        normal:'通常',
        reverse_fusion: '逆引き合体',
        normal_fusion: '通常合体',
        devil: '仲魔',
        setting:'環境',
        language: '言語',
        downgrade_fusion: 'ダウングレイド合体',
        allow: '許可する',
        deny: '許可しない',
        search:'探す'
      }
    },
    tw: {
        message:{
            reverse:'逆向',
            normal:'順向',
            reverse_fusion: '逆向合體',
            normal_fusion: '順向合體',
            devil: '惡魔',
            setting:'設定',
            language: '語言',
            downgrade_fusion: '降階合體',
            allow:'允許',
            deny:'不允許',
            search:'查詢'
        }
    }
  }
  
const i18n = new VueI18n({
locale: 'ja', // set locale
messages: messages // set locale messages
});
    
var app = new Vue({
    i18n:i18n,
    el:'#app',
    data:{
        races:ddd,
        devils:devil_data,
//fission        
        fission_target:null,
        fission_options:null,
//builder
        builder_target:null,
        builder_options:null,
        current_bom:null,
        builder_rarity_options:[
            {caption:" ★ 1 ",  state:true},
            {caption:" ★ 2 ",  state:true},
            {caption:" ★ 3 ",  state:true},
            {caption:" ★ 4 ",  state:true},
            {caption:" ★ 5 ",  state:true}
        ],
//fusion
        fusion_target:null,
        fusion_options:null,
        fusion_rarity_options:[
            {caption:"★1",  state:true},
            {caption:"★2",  state:true},
            {caption:"★3",  state:true},
            {caption:"★4",  state:true},
            {caption:"★5",  state:true}
        ],
        //setting
        lang_value:0,
        lang_options:[
            {text:'日本語', value:0},
            {text:'繁體中文', value:1}
//            {text:'English', value:2},
        ],
        allow_down_grade:0,
        allow_down_grade_options:[
            {text: 'message.allow', value:1},
            {text: 'message.deny', value:0}
        ],
        tabIndex:0,
        keyword:'',
        now:new Date(),
        gate_status_ch:false,
        gate_status_jp:false,
        gate_timer_ch:null,
        gate_timer_jp:null,
        updated_at:'180321'
    },
    created:function(){

        var c_lang_value = getCookie('lang_value');
        
        if(c_lang_value!=null){
            this.lang_value = c_lang_value;
        }

        switch(this.lang_value){
            case '0': i18n.locale='ja';break;
            case '1': i18n.locale='tw';break;
            case '2': i18n.locale='en';break;
            default: i18n.locale='ja';break;
        }

        var c_allow_down_grade = getCookie('allow_down_grade');

        if(c_allow_down_grade!=null){
            this.allow_down_grade = c_allow_down_grade;
        }

        setInterval(function(){

            app.now = new Date();

        },1000);
    },
    methods:{

        start_bom: function(devil){
          
            this.builder_target = new DevilBom(devil);
            this.current_bom = null;
            this.builder_options = null;
            this.tabIndex = 1;

            this.list_bom(this.builder_target);
        },
        list_bom: function(bom){

            if(this.current_bom==bom){
                this.cancel_choose();
            }
            else{
                this.current_bom = bom;
                this.builder_options = this.current_bom.devil.fission_formulas();
            }
        },
        reset_bom:function(bom){

            bom.unset();
            this.current_bom = null;
            this.builder_options = null;
        },
        choose_bom: function(bom){

            this.current_bom.set(bom);
            this.current_bom = null;
            this.builder_options = null;
        },
        cancel_choose: function(){

            this.current_bom = null;
            this.builder_options = null;
        },
        fusion : function(devil){

            this.fusion_target = devil;
            this.fusion_options = devil.fusion_formulas();
            this.tabIndex = 2;
        },
    },
    watch:{
        lang_value:function(){

            switch(this.lang_value){
                case 0: i18n.locale='ja';break;
                case 1: i18n.locale='tw';break;
                case 2: i18n.locale='en';break;
            }

            setCookie('lang_value', this.lang_value);
        },
        allow_down_grade:function(){

            if(this.current_bom!=null){
                this.builder_options = this.current_bom.devil.fission_formulas();
            }
                
            if(this.fusion_target!=null){
                this.fusion_options = this.fusion_target.fusion_formulas();
            }
                
            setCookie('allow_down_grade', this.allow_down_grade);
        },
        now:function(){

            var next, diff, h;
            var gate_hours_ch = [8,11,16,18,21,23];     //TW-JPT 9,12,17,19,22,0
            var gate_hours_jp = [6,11,16,18,21,23];     //JP-JPT 7,12,17,19,22,0
            var h = (this.now.getUTCHours()+8)%24;

            next = new Date(this.now.getTime());
            next.setMinutes(0);
            next.setSeconds(0);
            
            for(var i=0; i<gate_hours_ch.length;i++){
                var gate_hour = gate_hours_ch[i];
                if(h<gate_hour){
                    next.setHours(gate_hour);
                    this.gate_status_ch = false;
                    break;
                }
                if(h==gate_hour){
                    next.setHours(next.getHours()+1);
                    this.gate_status_ch = true;
                    break;
                }
                if(i==gate_hours_ch.length-1){
                    gate_hour = gate_hours_ch[0];
                    next.setHours(next.getHours()+24-h+gate_hour);
                    this.gate_status_ch = false;
                    break;
                }
            }
            var diff = new Date(next.getTime() - this.now.getTime());
            this.gate_timer_ch =  (diff.getUTCHours()+':'+diff.getUTCMinutes()+':'+diff.getUTCSeconds()).replace(/\b(?=(\d{1})(?!\d))/g,'0');

            next = new Date(this.now.getTime());
            next.setMinutes(0);
            next.setSeconds(0);

            for(var i=0; i<gate_hours_jp.length;i++){

                var gate_hour = gate_hours_jp[i];
                if(h<gate_hour){
                    next.setHours(gate_hour);
                    this.gate_status_jp = false;
                    break;
                }
                if(h==gate_hour){
                    next.setHours(next.getHours()+1);
                    this.gate_status_jp = true;
                    break;
                }
                if(i==gate_hours_jp.length-1){
                    gate_hour = gate_hours_jp[0];
                    next.setHours(next.getHours()+24-h+gate_hour);
                    this.gate_status_jp = false;
                    break;
                }
            }
            diff = new Date(next.getTime() - this.now.getTime());
            this.gate_timer_jp =  (diff.getUTCHours()+':'+diff.getUTCMinutes()+':'+diff.getUTCSeconds()).replace(/\b(?=(\d{1})(?!\d))/g,'0');
        }
    },
    computed:{
        filtered_devil_data: function(){
            
            var keyword = this.keyword.replace(/[!@#$%^&*()-=_+\[\]{}|\\]/g,'');

            var result = null;

            if(keyword){
                result = this.devils.filter(function(d){
                    return d.name.match(keyword)||d.name_tw.match(keyword);
                });
            }

            return result;
        },
        builder_total_mag: function(){
            
            return this.builder_target?this.builder_target.showTotalMag():'';
        },
        builder_total_mag_pure:function(){
            return this.builder_target?this.builder_target.showTotalMagPure():'';
        },
        filtered_builder_options:function(){

            var options = [];

            if(this.builder_options){

                this.builder_options.forEach(function(option){

                    var boms = option.boms.filter(function(bom){
                        
                        return app.builder_rarity_options[bom.child1.devil.rarity-1].state 
                            && app.builder_rarity_options[bom.child2.devil.rarity-1].state;
                    });

                    if(boms.length){
                        options.push({name:option.name,boms:boms});
                    }
                });
            }

            return options;
        },
        filtered_fusion_options:function(){

            var options = [];

            if(this.fusion_options){

                this.fusion_options.forEach(function(option){

                    var formulas = [];

                    option.formulas.forEach(function(formula){

                        var boms = formula.boms.filter(function(bom){
                        
                            return app.fusion_rarity_options[bom.child1.devil.rarity-1].state 
                                && app.fusion_rarity_options[bom.child2.devil.rarity-1].state;
                        });

                        if(boms.length){
                            formulas.push({name:formula.name,boms:boms});
                        }
                    });

                    if(formulas.length){
                        options.push({devil:option.devil,formulas:formulas});
                    }
                });
            }

            return options;
        }
    }
});

Vue.component('devil',{
    props:['devil','usage'],
    template:'#devil-t',
    methods:{
        click:function(){
            if(this.usage=='fission'){
                app.start_bom(this.devil);
            }
            if(this.usage=='builder'){
                this.$emit('click');
            }
        }
    }
});

Vue.component('devil-list',{
    props:['devils','usage'] ,
    template:'#devil-list-t',
    methods:{
        click:function(devil){
            if(this.usage=='fission'){
                app.fission(devil);
            }
            if(this.usage=='builder'){
                this.start_bom(devil);
            }
        },
        fusion:function(devil){
            app.fusion(devil);
        },
        fission:function(devil){
            app.fission(devil, true);
        },
        start_bom:function(devil){
            app.start_bom(devil);
        }
    }
});

Vue.component('devil-bom',{
    props:['bom','usage'],
    template:'#devil-bom-t',
    methods:{
        click:function(){
            if(this.usage=='builder')
                this.choose_bom(this.bom);
        },
        choose_bom: function(){
            app.choose_bom(this.bom);
        },
        cancel_choose: function(){
            app.cancel_choose();
        }
    }
});

Vue.component('devil-bom-list',{
    props:['boms','usage'],
    template:'#devil-bom-list-t'
});

Vue.component('devil-bom-builder',{
    props:['bom'],
    template:'#devil-bom-builder-t',
    methods:{
        list_bom:function(bom){
            app.list_bom(bom);
        },
        reset_bom:function(bom){
            app.reset_bom(bom);
        },
        is_current:function(){
            return this.bom==app.current_bom;
        }
    }
});

Vue.component('devil-bom-options',{
    props:['options','usage'],
    template:'#devil-bom-options-t'
});