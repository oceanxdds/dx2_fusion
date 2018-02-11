/*/////////////////////////////////////////////////
Dx2 Devil Fushion Emulator
Author: Robin Chiu
E-mail: oceanxdds@gmail.com
Github: https://github.com/oceanxdds/dx2_fushion
Publish: https://oceanxdds.github.io/dx2_fushion/
//////////////////////////////////////////////////*/

// Devil Data

var ddd = [
    {
        name:'大天使',
        formula:[
            ['神獸','女神'],
            ['神獸','魔神'],
            ['聖獸','女神'],
            ['天使','女神'],
            ['天使','聖獸'],
            ['墮天使','聖獸']
        ],
        devils:[
            {   name:'メタトロン',       name_tw:'梅塔特隆',   rarity:5,   grade:99,  icon:'daitensi_metatoron.png'     },
            {   name:'ミカエル',        name_tw:'米迦勒',      rarity:5,    grade:90, icon:'daitensi_mikaeru.png'     },
            {   name:'アズラエル',      name_tw:'阿斯萊爾',    rarity:4,    grade:67, icon:'daitensi_azuraeru.png'            },
            {   name:'サンダルフォン',   name_tw:'聖達芬',     rarity:4,           grade:61, icon:'daitensi_sandaruhuon.png'         },
            {   name:'ライラ',          name_tw:'萊拉',    rarity:3,           grade:43, icon:'daitensi_raira.png'          }
        ]
    },
    {
        name:'女神',
        formula:[
            ['聖獸','大天使'],
            ['聖獸','神獸'],
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
    {
        name:'魔神',
        formula:[
            ['女神','大天使'],
            ['神獸','大天使'],
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
        formula:[
            ['聖獸','魔神'],
            ['地母神','聖獸'],
            ['龍王','幻魔'],
            ['魔獸','魔神'],
            ['魔獸','聖獸'],
            ['魔獸','破壞神'],
            ['夜魔','妖魔'],
            ['邪神','魔神'],
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
        formula:[
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
        formula:[
            ['魔神','女神'],
            ['地母神','神獸'],
            ['地母神','破壞神'],
            ['妖魔','魔神'],
            ['妖魔','地母神'],
            ['墮天使','妖魔'],
            ['邪神','地母神'],
            ['邪神','鬼神'],
            ['妖獸','鬼神'],
            ['妖獸','妖魔'],
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
        formula:[
            ['地母神','女神'],
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
        formula:[
            ['破壞神','幻魔'],
            ['鬼神','女神'],
            ['鬼神','聖獸'],
            ['鬼神','破壞神'],
            ['墮天使','大天使'],
            ['妖鬼','破壞神'],
            ['鬼女','魔神'],
            ['鬼女','聖獸'],
            ['鬼女','破壞神'],
            ['鬼女','鬼神'],
            ['邪神','夜魔'],
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
        formula:[
            ['幻魔','神獸'],
            ['破壞神','聖獸'],
            ['妖魔','女神'],
            ['龍王','聖獸'],
            ['妖鬼','魔神'],
            ['妖鬼','神獸'],
            ['鬼女','龍王'],
            ['夜魔','地母神'],
            ['夜魔','妖鬼'],
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
        formula:[
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
        formula:[
            ['幻魔','聖獸'],
            ['鬼神','幻魔'],
            ['妖精','龍王'],
            ['墮天使','幻魔'],
            ['妖鬼','天使'],
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
        formula:[
            ['天使','神獸'],
            ['妖魔','幻魔'],
            ['魔獸','神獸'],
            ['妖精','聖獸'],
            ['妖精','幻魔'],
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
        formula:[
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
        formula:[
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
        formula:[
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
            {                name:'エリゴール',     name_tw:'埃力格',           rarity:1,                grade:10, icon:'datensi_erigoru'            },
            {                name:'メルコム',       name_tw:'梅爾克',         rarity:1,                grade:4, icon:'datensi_merukomu.png'            }
        ]
    },
    {
        name:'妖鬼',
        formula:[
            ['妖魔','大天使'],
            ['魔獸','龍王'],
            ['妖精','破壞神'],
            ['妖精','鬼神'],
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
        formula:[
            ['妖魔','鬼神'],
            ['龍王','地母神'],
            ['龍王','鬼神'],
            ['魔獸','地母神'],
            ['墮天使','女神'],
            ['妖鬼','女神'],
            ['妖鬼','聖獸'],
            ['妖鬼','妖魔'],
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
        formula:[
            ['天使','鬼神'],
            ['龍王','妖魔'],
            ['妖精','魔神'],
            ['墮天使','地母神'],
            ['妖鬼','妖精'],
            ['鬼女','幻魔'],
            ['妖獸','魔神'],
            ['妖獸','龍王'],
            ['妖獸','墮天使'],
            ['魔王','妖魔'],
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
        formula:[
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
        formula:[
            ['幻魔','大天使'],
            ['妖精','魔獸'],
            ['妖鬼','大天使'],
            ['鬼女','墮天使'],
            ['夜魔','魔神'],
            ['邪神','妖魔'],
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
        formula:[
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
        formula:[
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
        formula:[
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

// Initialize

var race_data = {};
var devil_data = [];

ddd.forEach(function(r){
    race_data[r.name] = r;
    r.devils.forEach(function(d, idx){
        d.race = r;
        d.max = idx==0 ? 999 : d.grade;
        d.min = (idx==r.devils.length-1 ? 0 : r.devils[idx+1].grade);
        devil_data.push(d);
    });
});

ddd.forEach(function(r){
    r.formula.forEach(function(f){
        f[0] = race_data[f[0]];
        f[1] = race_data[f[1]];
    });
});

// sub fucntion

function bom(devil){

    this.devil = devil;
    this.formula = formula = [];
  
    this.devil.race.formula.forEach(function(f){

        var r1 = f[0];
        var r2 = f[1];

        var f_name = r1.name + ' x ' + r2.name;
        var f_mats = [];

        r1.devils.forEach(function(d1){
            r2.devils.forEach(function(d2){

                var flag_success = true;
                var g = (d1.grade + d2.grade)/2;
                var obj = {
                    'd1':d1,
                    'd2':d2,
                    'max_rarity':(d1.rarity>d2.rarity) ? (d1.rarity*10+d2.rarity) : (d2.rarity*10+d1.rarity),
                    'upgrade':false,
                    'downgrade':false
                };

                if( app.allow_down_grade==0 && (d1.rarity>devil.rarity||d2.rarity>devil.rarity)){

                    flag_success = false;
                }

                if( flag_success && (devil.min <= g && g < devil.max )){
                    
                    if( d1.rarity > devil.rarity || d2.rarity > devil.rarity ){
                        obj.downgrade = true;
                    }
                    else if ( d1.rarity < devil.rarity && d2.rarity < devil.rarity){
                        obj.upgrade = true;
                    }

                    f_mats.push(obj);
                }
            });
        });

        f_mats.sort(function(c1,c2){
            return c1.max_rarity - c2.max_rarity;
        });

        var obj = {
            'name': f_name,
            'combination':f_mats
        }

        if(f_mats.length>0)
            formula.push(obj);
    });
   
}

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

// application

var app = new Vue({
    el:'#app',
    data:{
        races:ddd,
        devils:devil_data,
        master:null,
        queue:[],
        lang_value:0,
        lang_options:[
            {text:'日文', value:0},
            {text:'中文', value:1}
        ],
        allow_down_grade:0,
        allow_down_grade_options:[
            {text:'允許', value:1},
            {text:'不允許', value:0}
        ],
        display:true,
        tabIndex:0,
        keyword:'',
        updated_at:'2018.2.11'
    },
    created:function(){

        var c_lang_value = getCookie('lang_value');
        
        if(c_lang_value!=null){
            this.lang_value = c_lang_value;
        }

        var c_allow_down_grade = getCookie('allow_down_grade');

        if(c_allow_down_grade!=null){
            this.allow_down_grade = c_allow_down_grade;
        }
    },
    methods:{
        analyze : function(devil, reset){

            if(reset){
                this.queue = [devil];
            }
            else{
                this.queue.push(devil);
            }

            this.master = new bom(devil);
            this.tabIndex = 1;
        },
        preview : function(){
            if(this.queue.length>1){
               this.queue.pop();
               this.master = new bom(this.queue[this.queue.length-1]);
            }
        }
    },
    watch:{
        lang_value:function(){

            setCookie('lang_value', this.lang_value);
        },
        allow_down_grade:function(){

            if(this.master!=null)
                this.master = new bom(this.master.devil);
            
            setCookie('allow_down_grade', this.allow_down_grade);
        }
    },
    computed:{
        filtered_devil_data: function(){
            var keyword = this.keyword;
            return this.devils.filter(function(d){
                return d.name.match(keyword)||d.name_tw.match(keyword);
            });
        }
    }
});
