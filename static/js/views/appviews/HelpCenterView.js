/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  HelpCenterView class                   *
 *                                         *
 *  Handle help center settings            *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import View from '../../core/View.js'

class HelpCenterView extends View {

    constructor() {
        super();

        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView construction');
        }

        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : UserView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _clearPageSpace call');
        }

        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : UserView
     * desc   : Build UI elements
     **/
    _createUI() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _createUI call');
        }

        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:          document.createElement("UL"),
            menuLibraries:      document.createElement("LI"),
            menuShortcut:      document.createElement("LI"),
            menuTagConvention: document.createElement("LI"),
            menuRanksPerms: document.createElement("LI"),
            menuManaCoin: document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.classList.add("mzk-user-view");
        this.ui.menu.className         = "mzk-left-menu";
        this.ui.content.className      = "mzk-content";
        this.ui.menuTitle.innerHTML    = window.app.nls.helpView.panel;
        this.ui.menuLibraries.innerHTML = window.app.nls.helpView.libraries.entry;
        this.ui.menuShortcut.innerHTML = window.app.nls.helpView.shortcuts.entry;
        this.ui.menuTagConvention.innerHTML = window.app.nls.helpView.tag.entry;
        this.ui.menuRanksPerms.innerHTML = window.app.nls.helpView.ranks.entry;
        this.ui.menuManaCoin.innerHTML = window.app.nls.helpView.manacoin.entry;

        this.ui.menuList.appendChild(this.ui.menuLibraries);
        this.ui.menuList.appendChild(this.ui.menuShortcut);
        this.ui.menuList.appendChild(this.ui.menuTagConvention);
        this.ui.menuList.appendChild(this.ui.menuRanksPerms);
        this.ui.menuList.appendChild(this.ui.menuManaCoin);
        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestLibrariesPage();
    }


    /**
     * method : _eventListener (private)
     * class  : UserView
     * desc   : UserView event listeners
     **/
    _eventListener() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _eventListener call');
        }

        this.ui.menuLibraries.addEventListener("click", this._requestLibrariesPage.bind(this));
        this.ui.menuShortcut.addEventListener("click", this._requestShortcutsPage.bind(this));
        this.ui.menuTagConvention.addEventListener("click", this._requestTagConventionPage.bind(this));
        this.ui.menuRanksPerms.addEventListener("click", this._requestRanksPermsPage.bind(this));
        this.ui.menuManaCoin.addEventListener("click", this._requestManaCoinPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestShortcutsPage() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _requestShortcut call');
        }

        this._clearPageSpace();
        this.ui.menuShortcut.className     = "mzk-selected";
        this.ui.contentTitle.innerHTML     = window.app.nls.helpView.shortcuts.title;

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    _requestLibrariesPage() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _requestLibrariesPage call');
        }

        this._clearPageSpace();
        this.ui.menuLibraries.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = window.app.nls.helpView.libraries.title;

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestTagConventionPage() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _clearPageSpace call');
        }

        this._clearPageSpace();
        this.ui.menuTagConvention.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = window.app.nls.helpView.tag.title;

        let intro = document.createElement('P');
        intro.innerHTML = window.app.nls.helpView.tag.intro;

        let fileConv = document.createElement('H2');
        fileConv.innerHTMl = window.app.nls.helpView.tag.file.title;

        let fileDesc = document.createElement('P');
        fileDesc.innerHTMl = window.app.nls.helpView.tag.file.desc;

        let dirSpec = document.createElement('H3');
        dirSpec.innerHTML = window.app.nls.helpView.tag.file.dirTitle;

        let dirContent = document.createElement('P');
        dirContent.innerHTML = window.app.nls.helpView.tag.file.dir;

        let ex = document.createElement('H4');
        ex.innerHTML = window.app.nls.helpView.tag.file.exTitle;

        let dirEx = document.createElement('P');
        dirEx.innerHTML = window.app.nls.helpView.tag.file.exIntro;

        let dirPath = document.createElement('P');
        dirPath.innerHTML = window.app.nls.helpView.tag.file.exDirectory;

        let dirDesc = document.createElement('P');
        dirDesc.innerHTML = window.app.nls.helpView.tag.file.exStructure;

        let dirCompo = document.createElement('P');
        dirCompo.innerHTML = window.app.nls.helpView.tag.file.exTracks;

        let dirConclusion = document.createElement('P');
        dirConclusion.innerHTML = window.app.nls.helpView.tag.file.exConclusion;

        let fileSpec = document.createElement('H3');
        fileSpec.innerHTML = window.app.nls.helpView.tag.file.specTitle;

        let fileIntro = document.createElement('P');
        fileIntro.innerHTML = window.app.nls.helpView.tag.file.specIntro;

        let fileSpecList = document.createElement('UL');
        fileSpecList.classList.add('earningManaCoinList');
        let fileSpec1 = document.createElement('LI');
        let fileSpec2 = document.createElement('LI');
        let fileSpec3 = document.createElement('LI');
        let fileSpec4 = document.createElement('LI');
        let fileSpec5 = document.createElement('LI');
        let fileSpec6 = document.createElement('LI');
        let fileSpec7 = document.createElement('LI');
        let fileSpec8 = document.createElement('LI');
        let fileSpec9 = document.createElement('LI');
        let fileSpec10 = document.createElement('LI');

        fileSpec1.innerHTML = window.app.nls.helpView.tag.file.spec1;
        fileSpec2.innerHTML = window.app.nls.helpView.tag.file.spec2;
        fileSpec3.innerHTML = window.app.nls.helpView.tag.file.spec3;
        fileSpec4.innerHTML = window.app.nls.helpView.tag.file.spec4;
        fileSpec5.innerHTML = window.app.nls.helpView.tag.file.spec5;
        fileSpec6.innerHTML = window.app.nls.helpView.tag.file.spec6;
        fileSpec7.innerHTML = window.app.nls.helpView.tag.file.spec7;
        fileSpec8.innerHTML = window.app.nls.helpView.tag.file.spec8;
        fileSpec9.innerHTML = window.app.nls.helpView.tag.file.spec9;
        fileSpec10.innerHTML = window.app.nls.helpView.tag.file.spec10;

        fileSpecList.appendChild(fileSpec1);
        fileSpecList.appendChild(fileSpec2);
        fileSpecList.appendChild(fileSpec3);
        fileSpecList.appendChild(fileSpec4);
        fileSpecList.appendChild(fileSpec5);
        fileSpecList.appendChild(fileSpec6);
        fileSpecList.appendChild(fileSpec7);
        fileSpecList.appendChild(fileSpec8);
        fileSpecList.appendChild(fileSpec9);
        fileSpecList.appendChild(fileSpec10);

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));



        this.ui.content.appendChild(intro);
        this.ui.content.appendChild(fileConv);
        this.ui.content.appendChild(fileDesc);

        this.ui.content.appendChild(dirSpec);
        this.ui.content.appendChild(dirContent);
        this.ui.content.appendChild(ex);
        this.ui.content.appendChild(dirEx);
        this.ui.content.appendChild(dirPath);
        this.ui.content.appendChild(dirDesc);
        this.ui.content.appendChild(dirCompo);
        this.ui.content.appendChild(dirConclusion);

        this.ui.content.appendChild(fileSpec);
        this.ui.content.appendChild(fileIntro);
        this.ui.content.appendChild(fileSpecList);
        this.ui.content.appendChild(ex.cloneNode(true));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestRanksPermsPage() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _requestRanksPermsPage call');
        }

        this._clearPageSpace();
        this.ui.menuRanksPerms.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = window.app.nls.helpView.ranks.title;

        let intro = document.createElement('P');
        intro.innerHTML = window.app.nls.helpView.ranks.text;

        let ranks = document.createElement('H2');
        ranks.innerHTML = window.app.nls.helpView.ranks.ranksSection.title;

        let ranksPublicDesc = document.createElement('P');
        ranksPublicDesc.innerHTML = window.app.nls.helpView.ranks.ranksSection.desc;

        let ranksPublic = document.createElement('UL');
        ranksPublic.classList.add('earningManaCoinList');

        let ranksPublic1 = document.createElement('LI');
        let ranksPublic2 = document.createElement('LI');
        let ranksPublic3 = document.createElement('LI');

        ranksPublic1.innerHTML = "<b>Naab</b>" + window.app.nls.helpView.ranks.ranksSection.indexUnder + "XX";
        ranksPublic2.innerHTML = "<b>User</b>" + window.app.nls.helpView.ranks.ranksSection.indexBetween + "XX" + window.app.nls.helpView.ranks.ranksSection.and + "YY";
        ranksPublic3.innerHTML = "<b>Moderator</b>" + window.app.nls.helpView.ranks.ranksSection.indexOver + "XX";

        ranksPublic.appendChild(ranksPublic1);
        ranksPublic.appendChild(ranksPublic2);
        ranksPublic.appendChild(ranksPublic3);

        let ranksPrivDesc = document.createElement('P');
        ranksPrivDesc.innerHTML = window.app.nls.helpView.ranks.ranksSection.special;

        let ranksPriv = document.createElement('UL');
        ranksPriv.classList.add('earningManaCoinList');

        let ranksPriv1 = document.createElement('LI');
        let ranksPriv2 = document.createElement('LI');
        let ranksPriv3 = document.createElement('LI');

        ranksPriv1.innerHTML = "<b>Banned</b>" + window.app.nls.helpView.ranks.ranksSection.banned;
        ranksPriv2.innerHTML = "<b>Admin</b>" + window.app.nls.helpView.ranks.ranksSection.admin;
        ranksPriv3.innerHTML = "<b>Root</b>" + window.app.nls.helpView.ranks.ranksSection.root;

        ranksPriv.appendChild(ranksPriv1);
        ranksPriv.appendChild(ranksPriv2);
        ranksPriv.appendChild(ranksPriv3);

        let perm = document.createElement('H2');
        perm.innerHTML = window.app.nls.helpView.ranks.perms.title;

        let permDesc = document.createElement('P');
        permDesc.innerHTML = window.app.nls.helpView.ranks.perms.desc;

        // TODO : mk table depending on nls array of perms (for statement)

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));

        this.ui.content.appendChild(intro);

        this.ui.content.appendChild(ranks);
        this.ui.content.appendChild(ranksPublicDesc);
        this.ui.content.appendChild(ranksPublic);
        this.ui.content.appendChild(ranksPrivDesc);
        this.ui.content.appendChild(ranksPriv);

        this.ui.content.appendChild(perm);
        this.ui.content.appendChild(permDesc);
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestManaCoinPage() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _requestManaCoinPage call');
        }

        this._clearPageSpace();
        this.ui.menuManaCoin.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = window.app.nls.helpView.manacoin.title;


        let inShortItem1 = document.createElement('LI');
        let inShortItem2 = document.createElement('LI');
        let inShortItem3 = document.createElement('LI');
        let inShortItem4 = document.createElement('LI');

        inShortItem1.innerHTML = window.app.nls.helpView.manacoin.inShort1;
        inShortItem2.innerHTML = window.app.nls.helpView.manacoin.inShort2;
        inShortItem3.innerHTML = window.app.nls.helpView.manacoin.inShort3;
        inShortItem4.innerHTML = window.app.nls.helpView.manacoin.inShort4;


        let intro = document.createElement('P');
        intro.innerHTML = window.app.nls.helpView.manacoin.intro;

        let earningMCTitle = document.createElement('H2');
        earningMCTitle.innerHTML = window.app.nls.helpView.manacoin.earningTitle;

        let earningMC = document.createElement('P');
        earningMC.innerHTML = window.app.nls.helpView.manacoin.earningListTitle;

        let earningMCList = document.createElement('UL');
        let earningItem1 = document.createElement('LI');
        let earningItem2 = document.createElement('LI');
        let earningItem3 = document.createElement('LI');
        let earningItem4 = document.createElement('LI');
        let earningItem5 = document.createElement('LI');

        earningMCList.classList.add('earningManaCoinList');
        earningItem1.innerHTML = window.app.nls.helpView.manacoin.earningList1;
        earningItem2.innerHTML = window.app.nls.helpView.manacoin.earningList2;
        earningItem3.innerHTML = window.app.nls.helpView.manacoin.earningList3;
        earningItem4.innerHTML = window.app.nls.helpView.manacoin.earningList4;
        earningItem5.innerHTML = window.app.nls.helpView.manacoin.earningList5;

        earningMCList.appendChild(earningItem1);
        earningMCList.appendChild(earningItem2);
        earningMCList.appendChild(earningItem3);
        earningMCList.appendChild(earningItem4);
        earningMCList.appendChild(earningItem5);

        let earningMCText = document.createElement('P');
        earningMCText.innerHTML = window.app.nls.helpView.manacoin.earningOutro;

        let listeningTitle = document.createElement('H3');
        listeningTitle.innerHTML = window.app.nls.helpView.manacoin.listeningTitle;

        let listeningText = document.createElement('P');
        listeningText.innerHTML = window.app.nls.helpView.manacoin.listeningDesc;

        let listeningInShortTitle = document.createElement('P');
        listeningInShortTitle.innerHTML = '<b>' + window.app.nls.helpView.manacoin.listeningShort + '</b>';

        let listeningInShortList = document.createElement('UL');
        listeningInShortList.classList.add('earningManaCoinList');
        listeningInShortList.appendChild(inShortItem1);
        listeningInShortList.appendChild(inShortItem3);

        let songRequestTitle = document.createElement('H3');
        songRequestTitle.innerHTML = window.app.nls.helpView.manacoin.songReqTitle;

        let songRequestText = document.createElement('P');
        songRequestText.innerHTML = window.app.nls.helpView.manacoin.songReqDesc;

        let songRequestInShortTitle = document.createElement('P');
        songRequestInShortTitle.innerHTML = '<b>' + window.app.nls.helpView.manacoin.songReqShort + '</b>';

        let songRequestInShortList = document.createElement('UL');
        songRequestInShortList.classList.add('earningManaCoinList');
        songRequestInShortList.appendChild(inShortItem1.cloneNode(true));
        songRequestInShortList.appendChild(inShortItem2);
        songRequestInShortList.appendChild(inShortItem3.cloneNode(true));

        let uploadTitle = document.createElement('H3');
        uploadTitle.innerHTML = window.app.nls.helpView.manacoin.uploadTitle;

        let uploadText = document.createElement('P');
        uploadText.innerHTML = window.app.nls.helpView.manacoin.uploadDesc;

        let uploadInShortTitle = document.createElement('P');
        uploadInShortTitle.innerHTML = '<b>' + window.app.nls.helpView.manacoin.uploadShort + '</b>';

        let uploadInShortList = document.createElement('UL');
        uploadInShortList.classList.add('earningManaCoinList');
        uploadInShortList.appendChild(inShortItem4);
        uploadInShortList.appendChild(inShortItem2.cloneNode(true));
        uploadInShortList.appendChild(inShortItem3.cloneNode(true));

        let editTitle = document.createElement('H3');
        editTitle.innerHTML = window.app.nls.helpView.manacoin.editTitle;

        let editText = document.createElement('P');
        editText.innerHTML = window.app.nls.helpView.manacoin.editDesc;

        let editInShortTitle = document.createElement('P');
        editInShortTitle.innerHTML = '<b>' + window.app.nls.helpView.manacoin.editShort + '</b>';

        let editInShortList = document.createElement('UL');
        editInShortList.classList.add('earningManaCoinList');
        editInShortList.appendChild(inShortItem4.cloneNode(true));
        editInShortList.appendChild(inShortItem2.cloneNode(true));
        editInShortList.appendChild(inShortItem3.cloneNode(true));

        let achievementsTitle = document.createElement('H3');
        achievementsTitle.innerHTML = window.app.nls.helpView.manacoin.achivTitle;

        let achievementsText1 = document.createElement('P');
        achievementsText1.innerHTML = window.app.nls.helpView.manacoin.achivDesc;

        let achievementsTypesList = document.createElement('UL');
        achievementsTypesList.classList.add('earningManaCoinList');

        let achievementTypesItem1 = document.createElement('LI');
        let achievementTypesItem2 = document.createElement('LI');
        let achievementTypesItem3 = document.createElement('LI');

        achievementTypesItem1.innerHTML = window.app.nls.helpView.manacoin.achivEntry1;
        achievementTypesItem2.innerHTML = window.app.nls.helpView.manacoin.achivEntry2;
        achievementTypesItem3.innerHTML = window.app.nls.helpView.manacoin.achivEntry3;

        achievementsTypesList.appendChild(achievementTypesItem1);
        achievementsTypesList.appendChild(achievementTypesItem2);
        achievementsTypesList.appendChild(achievementTypesItem3);

        let achievementsText2 = document.createElement('P');
        achievementsText2.innerHTML = window.app.nls.helpView.manacoin.achivOutro;

        let achievementsInShortTitle = document.createElement('P');
        achievementsInShortTitle.innerHTML = '<b>' + window.app.nls.helpView.manacoin.achivShort + '</b>';

        let achievementsInShortList = document.createElement('UL');
        achievementsInShortList.classList.add('earningManaCoinList');
        achievementsInShortList.appendChild(inShortItem1.cloneNode(true));

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(intro);
        this.ui.content.appendChild(earningMCTitle);
        this.ui.content.appendChild(earningMC);
        this.ui.content.appendChild(earningMCList);
        this.ui.content.appendChild(earningMCText);

        this.ui.content.appendChild(listeningTitle);
        this.ui.content.appendChild(listeningText);
        this.ui.content.appendChild(listeningInShortTitle);
        this.ui.content.appendChild(listeningInShortList);

        this.ui.content.appendChild(songRequestTitle);
        this.ui.content.appendChild(songRequestText);
        this.ui.content.appendChild(songRequestInShortTitle);
        this.ui.content.appendChild(songRequestInShortList);

        this.ui.content.appendChild(uploadTitle);
        this.ui.content.appendChild(uploadText);
        this.ui.content.appendChild(uploadInShortTitle);
        this.ui.content.appendChild(uploadInShortList);

        this.ui.content.appendChild(editTitle);
        this.ui.content.appendChild(editText);
        this.ui.content.appendChild(editInShortTitle);
        this.ui.content.appendChild(editInShortList);

        this.ui.content.appendChild(achievementsTitle);
        this.ui.content.appendChild(achievementsText1);
        this.ui.content.appendChild(achievementsTypesList);
        this.ui.content.appendChild(achievementsText2);
        this.ui.content.appendChild(achievementsInShortTitle);
        this.ui.content.appendChild(achievementsInShortList);
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        if (window.debug && this.LOG) {
            console.log('    HelpCenterView : _unselectAllMenuEntries call');
        }

        this.ui.menuLibraries.className = "";
        this.ui.menuShortcut.className = "";
        this.ui.menuTagConvention.className = "";
        this.ui.menuRanksPerms.className = "";
        this.ui.menuManaCoin.className = "";
    }

}

export default HelpCenterView
