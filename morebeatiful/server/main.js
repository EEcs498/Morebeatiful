import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/api/profile.js';
import { Products } from '../imports/api/products.js';
import { Scores } from '../imports/api/scores.js';
import { Own_list } from '../imports/api/own_list.js';
import { Wish_list } from '../imports/api/wish_list.js';
import { Review } from '../imports/api/review.js';
Meteor.startup(() => {
  // code to run on server at startup
/*  Products.insert({
         brand: "Charlotte Tilbury", type: "Blush", name: "Cheek to Chic Swish & Pop Blushe", price: "$$$", createdAt: new Date(),
         src : "https://lh3.googleusercontent.com/JNL7qx6iduKZC5IW7MkUt8R8_ayVtltQQ-q0c8SbWNBbWHp-tMGeoHUG9j24F7E02TnbJjy-kq_AOY7FtdS1jusQq6Jz0X3VYnKRmZfiADX0QlMUIbsCBw3gtFgNc6O9AenmQH5mPE53S0BmKIWJtoAyL9Df-kRCuNFPE58P2I0fHsWL58PiCyZrUQf7ymLsVgBU6rZH-vnJXY55hhgVnhbNsAjIH2xXYuPLpeHSl8-4KjnI4v2O7vpLcWVomkjeahAeyPrb9WsfEAhCGFg7neuJxfsj1_hiOYEwPG3UPDnH3sbfoAC9JvMGHwFlFlQw6zZXODIKMjsyFWnUxdj0TbS_zB5d4uRc9CycD19Ubs8MvAsywxTcYASOiNAVgIrwb51ep3DkvnhhqssCqwQC4u9b2ZSZIHGFXiGqa5U65XNfYy5wOk_Okt--88FcSiBBcu2LdXLFPqTFivq-YI_gKgJAifrAE4JIUheryZshUtGx_Xl7dY2TJ5vjvq_T0dWlhnUS_b5pjav2bQWfcWyxE9wugiOmnixOOVcpvn4Tgnzc9L7HuhrN9FP8cH1lnKCaZpPXRJ2sAr1g05bH1YcPrgNMAmP67rmsJLbuhGQCS0XLUydhmZMH=w930-h1426-no"
       });
  Products.insert({
         brand: "Cle De Peau", type: "highlighter", name: "Luminizing Face Enhance", price: "$$$$", createdAt: new Date(),
         src : "https://lh3.googleusercontent.com/_XW78z4W6q0ED2Wrn-JK9p_12tDJcvlF6SEedPQUswGbA5UJcWY-tgGNXom-WxQbHo4Mrzos5TYoYfCXCF9KDztMa5oKg9o1VrcP_AJklcyUaaFpFocoDBpojnYRd4XTSfjPgl0rcNqI7C7pv_C0u7dKpKaY96GUGwwYCwD8GpdMfCrreBLmSyi5bsDAEeMrD4emZL8W3q6PpUwvv9kKgzEp0ARm0q0NDLaAAwpr3mUvD4xCw2RQiQ1Bb7Xnaz69qZOcuzG0P4mcSNVq8N5O6G0aNrmdsT6rpxH1Ctq0_fK8YmDyc4LAyUS3jgRa_TmgYGwt48GP7ydMlR21Gx5jQnc7Z2OmPWwKPwtl0QXvGoaBKm0oT-b1ucG8hWsOFkiKYJsfUVt-m2ydqRpqXeHb59v-vg_CQp5HM_AWqR-eLf5tjtMMCTqkerAuUnkNYMObkvrzn1Fqf6omiWU775p7bKcRvqNVX-r39J2vl58eR7L06my2tclUkJpfjLjkliVYf3oq7_VKZ5tGSvJ6OD0bUzR7EcK4MYoJmZ7A2wujiJgJfch6ZrmuMDwEDP4N14nFze3op3YFjqBVTeyVoSS_cwYwYcYmgDiC_RPTxS3wt3-rzqZOfa82=w984-h1312-no"
      });
  Products.insert({
         brand: "Cle De Peau", type: "Bronzer", name: "Bronzing Powder Don",price: "$$", createdAt: new Date(),
        src : "https://lh3.googleusercontent.com/7AUjVDAR8LWJi6x57krYif3fIxRhaGYZ2AllRhNmltI8fRRGVvfcMF1ClI7Jla-GUtM3I6EUnX574ddi-Qcs4rD7VYVrKDKQPd7fFv-32X5CryOXi3Yq0spkpP8ccc3jHTQJNfxElgC7VGsHHIcSX-yVwUb6pZ3OiFyqxPTaiY85g4CeKRLhzYu7dCspu8vd95h4pqx1JAdZoKR-mmYPZPkVr7PwTYdd3oTe7dns7WZ1Y1PhmYDZP2rQ3g_XflU3zBfbMVIpSVB4TgkQ2t7qpWRetHjlS4nHDgJbngntQAbFEMkk2v2Nxwe-s30t3bYWWl8e_G6L-sInn9ARIqaBq3ci7wFebavHwkY6XKJKeUCoqorfpT6H7SGrPuA3nxq3_rNsTnMZPNJ5kbC-_eV3KuKtgRBGcN1rXCsKkUBGrVhl9Id6ga5Cv54cyqL7d2I5kq41gaqJw6nh9hq5THAoVWDjcgzUD-NK3XFujx16MoG8tRE0vWnpMOL1_8KDRL1PrVtKZnpYkzcrxrhACn5Ujq1F2v5uznbIbjrxGsihJBcN8OLt_hXWH1mkWJJCEERpBpPXIC_SzQ-FRjnHwC9zlJFE7O-3WRZvHcVYBi7VI2N_iQbXg_AQ=w400-h500-no"
      });
  Products.insert({
             brand: "Chanel", type: "Blush", name: "Powder Blush", price: "$$$",createdAt: new Date(),
         src : "https://lh3.googleusercontent.com/tQjLZOW78Jf-uTjnMWdaqdS2I2FSOtAKQO2WWkXmgMSTCxOQYZXtQx5okz9UOsCoqZmnsJAE4ROeYM-HaSBneiXLnRKqqMHERXxg6yAYwAXEO09ozRhnOXcJzZ1CCuNzeVEFUOFbuBxWSVaz7qJ2KoyMWvtVTO1bE5eKXPVXEsFkLzOAuq7sBBDaQcjMZEvAO6YxIFOp0VrdTHeJfEFvuHNKgYmDqWlZRKmtVyt_MZouMw64XrXSstu61NBKXuHW4S0NIXc0KF3Mj0f0AW0GE3ztJLBw8RYvhCldnXdOgp7ZmFhFqyGxpr9Wo6Fsytxg214t5PhXcvHfN8swZIDGWpM3qpZG9aIV9ibAjLFtAYif_rGiAaerZ2FWDxli_Wfm-x6D5X4mswL8NmvjfIURAe4v1NP2UIRPhiycEBa8zPLt70-h9VsVxHyuOoio8kb7buDaCyzgGsgFZLRMYJYztSTsPvvLmC1vWNiVoEhrXrWopkfqVPSuW36WnPOQY9M5E_aIk4J5OrxOcmKrRfJKIl5VyzSjbGS6h_VVL9YAW3xu4jFyLjtXsxccfzPOhWAuAcME-QmdBvrnP8M2P-zSD17aHxq-fmOOLccnm6egBKOubBUu=s512-no"
      });
*/
});
/*Accounts.onCreateUser(function(options, user) {
  options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  user.profile = options.profile;
  return user;
});*/
