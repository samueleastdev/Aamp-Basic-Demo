/*
 * If not stated otherwise in this file or this component's license file the
 * following copyright and licenses apply:
 *
 * Copyright 2018 RDK Management
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//Comcast DRM config for AAMP
var comcastDrmConfig = {
  "com.microsoft.playready": "mds.ccp.xcal.tv",
  "com.widevine.alpha": "mds.ccp.xcal.tv",
  preferredKeysystem: "com.widevine.alpha",
};

var microsoftDrmConfig = {
  "com.microsoft.playready":
    "https://test.playready.microsoft.com/service/rightsmanager.asmx?PlayRight=1&UseSimpleNonPersistentLicense=1",
};

var amsamplesDrmConfig = {
  "com.widevine.alpha":
    "https://amssamples.keydelivery.mediaservices.windows.net/Widevine/?KID=1ab45440-532c-4399-94dc-5c5ad9584bac",
  "com.microsoft.playready":
    "https://amssamples.keydelivery.mediaservices.windows.net/PlayReady/",
  //'preferredKeysystem':'com.microsoft.playready',
  preferredKeysystem: "com.widevine.alpha",
};

var urls = [
  {
    name: "Big Buck Bunny (DASH, Clear)",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    drmConfig: null,
  },
  {
    name: "DOLBY DIGITAL PLUS 7.1 – H.264",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    drmConfig: null,
  },
  /*{
    name: "Transformers (DASH, Widevine)",
    url: "http://ccr.ipvod-t6.xcr.comcast.net/ipvod11/TVNC0000000003007630/movie/1558999503868/manifest.mpd",
    drmConfig: comcastDrmConfig,
  },
  {
    name: "Captain America (HLS, Access)",
    url: "http://ccr.ipvod-t6.xcr.comcast.net/ipvod20/PCKG4033105720190601/movie/1558583414729/manifest.m3u8",
    drmConfig: comcastDrmConfig, 
  },   
  {     
    name: "Godzilla (HLS, Access)",
    url: "http://ccr.ipvod-t6.xcr.comcast.net/ipvod1/TVNC0000000002950377/movie/1556381264464/manifest.m3u8",
    drmConfig: comcastDrmConfig,
  },  
  {
    name: "Tears of Steel (4k DASH, PlayReady)",
    url: "https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-playready.ism/.mpd",
    drmConfig: microsoftDrmConfig,
  },*/
  {
    name: "Big Buck Bunny (DASH, Multi-DRM)",
    url: "https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest(format=mpd-time-csf)",
    drmConfig: amsamplesDrmConfig,
  },
];
