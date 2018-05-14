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
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : UserView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : UserView
     * desc   : Build UI elements
     **/
    _createUI() {
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
        this.ui.menuTitle.innerHTML    = "Help Center";
        this.ui.menuLibraries.innerHTML = "Libraries";
        this.ui.menuShortcut.innerHTML = "Shortcuts";
        this.ui.menuTagConvention.innerHTML = "Tag convention";
        this.ui.menuRanksPerms.innerHTML = "Ranks / Permissions";
        this.ui.menuManaCoin.innerHTML = "ManaCoin";

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
        this._clearPageSpace();
        this.ui.menuShortcut.className     = "mzk-selected";
        this.ui.contentTitle.innerHTML     = "Shortcuts";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    _requestLibrariesPage() {
        this._clearPageSpace();
        this.ui.menuLibraries.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "Libraries";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestTagConventionPage() {
        this._clearPageSpace();
        this.ui.menuTagConvention.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "Tag and naming convention";

        let intro = document.createElement('P');
        intro.innerHTML = "In order to have a consistent and unified music library, we have set a couple rules and guidelines to do so. Those guidelines are specific to the manazeak.org instance (if you run your own @home, feel free to set your own convention). This section will cover two main subjects : file naming and tag rules.";

        let fileConv = document.createElement('H2');
        fileConv.innerHTMl = 'File convention';

        let fileDesc = document.createElement('P');
        fileDesc.innerHTMl = "A precisely named file is an easily one to find and manipulate, that's for sure. The following guidelines covers the whole file naming process and must be always checked before any track/album upload on ManaZeak.";

        let dirSpec = document.createElement('H3');
        dirSpec.innerHTML = 'Directory specifications';

        let dirContent = document.createElement('P');
        dirContent.innerHTML = "When you upload a full album (to be included in Albums' library), you must comply with a specific folder naming convention. Each artists must have its own folder, named identically with the artist's name. In this new folder, you must refer each and every album by its year, followed by a hyphen (-) surrounded with one space and the album title (<b>%year% - %album%</b>). Then, you may put all the album tracks in it, next to the album's cover. The album's cover itself must be a 1000x1000 .jpg file, named with the album's folder name. Finally, all the album's tracks must comply with the file specifications enounced in the File specifications section.<br><br>" +
            "Some album are from a specific genre : single, EP. For a single, the mention <b>- Single</b> must appear at the end of the album title, for an EP, only add <b>EP</b> at the end of the album's title";

        let ex = document.createElement('H4');
        ex.innerHTML = 'Example';

        let dirEx = document.createElement('P');
        dirEx.innerHTMl = "Let's take the Metallica's album Master Of Puppets as an example. First, create the following directory hierrarchy to put tracks in ; Metallica folder, with a Master Of Puppets sub-folder :";

        let dirPath = document.createElement('P');
        dirPath.innerHTML = "Metallica / 1986 - Master Of Puppets /";

        let dirDesc = document.createElement('P');
        dirDesc.innerHTML = "After the folders creation, fill the <code>1986 - Master of Puppets</code> folder with it relative files :";

        let dirCompo = document.createElement('P');
        dirCompo.innerHTML = "101 - Metallica - Battery.flac<br>" +
            "102 - Metallica - Master Of Puppets.flac<br>" +
            "103 - Metallica - The Thing That Should Not Be.flac<br>" +
            "104 - Metallica - Welcome Home (Sanitarium).flac<br>" +
            "105 - Metallica - Disposable Heroes<br>" +
            "106 - Metallica - Leper Messiah.flac<br>" +
            "107 - Metallica - Orion.flac<br>" +
            "108 - Metallica - Damage, Inc.flac<br>" +
            "1986 - Master Of Puppets.jpg";

        let dirConclusion = document.createElement('P');
        dirConclusion.innerHTMl = "You can now upload the album by drag and droppign the Metallica folder you created straight in ManaZeak.";

        let fileSpec = document.createElement('H2');
        fileSpec.innerHTML = 'File specifications';

        let fileIntro = document.createElement('P');
        fileIntro.innerHTML = "Be sure that the file(s) you push are matching these requirements :";

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

        fileSpec1.innerHTML = "naming for Albums library: <b>%disc number%%track number% - %composer% - %title%</b> ;";
        fileSpec2.innerHTML = "naming for Artists and Mix libraries: <b>%composer% - %title%</b> ;";
        fileSpec3.innerHTML = "track names must be CamelCase, always ;";
        fileSpec4.innerHTML = "special characters must be replaced with a hyphen (-) ;";
        fileSpec5.innerHTML = "artists name must respect the artists specific case ;";
        fileSpec6.innerHTML = "composer(s) must be written with the artist name only ;";
        fileSpec7.innerHTML = "multi-artists must be separated with comas, and alphabetically ordered (composer, featured artists and remixers/cover artists) ;";
        fileSpec8.innerHTML = "featured artists must be place after the title, surrounded with parenthesis and prefixed with the <i>feat.</i> mention ;";
        fileSpec9.innerHTML = "remixers or cover artists must be mentioned at the end, surrounded with parenthesis and suffixed with the <i>Remix</i> or <i>Cover</i> mention ;";
        fileSpec10.innerHTML = "the mention <i>[Bonus track]</i> must appear in the appropriate case, as the last file name element.";

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
        this._clearPageSpace();
        this.ui.menuRanksPerms.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "Ranks / Permissions";

        let intro = document.createElement('P');
        intro.innerHTML = "In order to keep ManaZeak a great place for everyone, some features are locked until you earn a given reputation. Don't panic, the locked features are mostly libraries' management ones, so you won't be restricted on listening music (we are not some fucking dickhead from Spotify or Apple Music, god damn it).<br><br>" +
            "When you first sign into ManaZeak, you will be ranked as a new comer. You will be able to naviguate trhough libraries, listen to music and a lot more that we'll be glad you discover. Nevertheless, you won't be able to upload tracks or edit tags yet. If you are not OK with those limited privileges, brace yourself, roll up your sleeves and try to earn ManaCoins  (see ManaCoin entry in the Help Center).<br><br>" +
            "Your ManaCoin wallet helps us determine a confidence index that is a trust indicator we can put into you (again, we are not FaceBook, and this damn confidence index is not secret and won't be sold to advertiser motherfcukers). You can see it in your profile view, in the My Wallet tab. As mentionned in the ManaCoin entry, you can quickly fall into the abyss if you purposely fuck up ManaZeak. In the contrary, if you do you best to make it cleaner (suggesting tags) or enhance libraries content with your musical tastes (uploading tracks), you will soon climb the ladder and rank up: ranking up will give you more control over music collections and tracks, among of giving you the prestige of a rank.";

        let ranks = document.createElement('H2');
        ranks.innerHTML = 'Ranks';

        let ranksPublicDesc = document.createElement('P');
        ranksPublicDesc.innerHTML = "Here is the list of the official ranks of ManaZeak, with the required confidence index to be promoted :";

        let ranksPublic = document.createElement('UL');
        ranksPublic.classList.add('earningManaCoinList');

        let ranksPublic1 = document.createElement('LI');
        let ranksPublic2 = document.createElement('LI');
        let ranksPublic3 = document.createElement('LI');

        ranksPublic1.innerHTML = "<b>Naab</b> : Confidence index is under XX";
        ranksPublic2.innerHTML = "<b>User</b> : Confidence index is between XX and YY";
        ranksPublic3.innerHTML = "<b>Moderator</b> : Confidence index over XX";

        ranksPublic.appendChild(ranksPublic1);
        ranksPublic.appendChild(ranksPublic2);
        ranksPublic.appendChild(ranksPublic3);

        let ranksPrivDesc = document.createElement('P');
        ranksPrivDesc.innerHTML = "These are the standard rank that are available for all. There are three special rank that are only accessible under a given set of condition :";

        let ranksPriv = document.createElement('UL');
        ranksPriv.classList.add('earningManaCoinList');

        let ranksPriv1 = document.createElement('LI');
        let ranksPriv2 = document.createElement('LI');
        let ranksPriv3 = document.createElement('LI');

        ranksPriv1.innerHTML = "<b>Banned</b> : No need to explain, you did some serious shit in there...";
        ranksPriv2.innerHTML = "<b>Admin</b> : Libraries administrator are your gods inside ManaZeak, press F.";
        ranksPriv3.innerHTML = "<b>Root</b> : Root Master Race is not accessible. Consider Root as the ManaZeak' non-human account.";

        ranksPriv.appendChild(ranksPriv1);
        ranksPriv.appendChild(ranksPriv2);
        ranksPriv.appendChild(ranksPriv3);

        let perm = document.createElement('H2');
        perm.innerHTML = 'Permissions';

        let permDesc = document.createElement('P');
        permDesc.innerHTML = "As said previously, those ranks are tightly linked with permissions in ManaZeak. Here you have a table that summarize permissions with the minimal rank necessary :";

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
        this._clearPageSpace();
        this.ui.menuManaCoin.className = "mzk-selected";
        this.ui.contentTitle.innerHTML      = "ManaCoin";


        let inShortItem1 = document.createElement('LI');
        let inShortItem2 = document.createElement('LI');
        let inShortItem3 = document.createElement('LI');
        let inShortItem4 = document.createElement('LI');

        inShortItem1.innerHTML = 'will make you earn ManaCoins ;';
        inShortItem2.innerHTML = 'will make you loose ManaCoins if refused ;';
        inShortItem3.innerHTML = 'is taken into account to compute your confidence index.';
        inShortItem4.innerHTML = 'will make you earn ManaCoins if accepted ;';


        let intro = document.createElement('P');
        intro.innerHTML = 'The ManaCoin is an internal currency for ManaZeak that aim to reward good practices and usages in the app. In the contrary, it is a way to keep ManaZeak clean from savage attacks, also known as sabotage. It aim to enhance collaboration in ManaZeak and reward any kind of contributions. Earning ManaCoins is a way to rank and get more permissions (see <b>Earning ManaCoin</b> section) so that administrators can trust you, and let you become a moderator of ManaZeak (see <b>Ranking system</b> section).';

        let earningMCTitle = document.createElement('H2');
        earningMCTitle.innerHTML = 'Earning ManaCoin';

        let earningMC = document.createElement('P');
        earningMC.innerHTML = 'There is several way to earn ManaCoins in ManaZeak :';

        let earningMCList = document.createElement('UL');
        let earningItem1 = document.createElement('LI');
        let earningItem2 = document.createElement('LI');
        let earningItem3 = document.createElement('LI');
        let earningItem4 = document.createElement('LI');
        let earningItem5 = document.createElement('LI');

        earningMCList.classList.add('earningManaCoinList');
        earningItem1.innerHTML = 'listening to music ;';
        earningItem2.innerHTML = 'making song/feature request(s) ;';
        earningItem3.innerHTML = 'uploading track(s)/album(s) ;';
        earningItem4.innerHTML = 'editing track(s) metadata ;';
        earningItem5.innerHTML = 'earning achievements.';

        earningMCList.appendChild(earningItem1);
        earningMCList.appendChild(earningItem2);
        earningMCList.appendChild(earningItem3);
        earningMCList.appendChild(earningItem4);
        earningMCList.appendChild(earningItem5);

        let earningMCText = document.createElement('P');
        earningMCText.innerHTML = "Those ways to earn ManaCoin depends on your rank, and some may not be available if your <em>under age</em> (below a given rank, see <b>Ranking system</b> section). Also, they doesn't reward you with the same amount of ManaCoins, since some of actions are pretty different. Don't bother asking, those values are super secret, and won't be exposed at any given time.";

        let listeningTitle = document.createElement('H3');
        listeningTitle.innerHTML = 'Listening to Music :';

        let listeningText = document.createElement('P');
        listeningText.innerHTML = "This is the most basic way to earn ManaCoins. The principle behind it is pretty simple, the more you spend time listening to music on ManaZeak, the more you will get ManaCoins. To be fair with other users, the earning function is not linear, and it will be harder to mine ManaCoins this way over time. However, there is no cap value so you can <em>theorically</em> get an infinite amount of ManaCoins listening to music ; it would only take some lifetimes to do so, but who are we to judge!";

        let listeningInShortTitle = document.createElement('P');
        listeningInShortTitle.innerHTML = '<b>In short, listening to music :</b>';

        let listeningInShortList = document.createElement('UL');
        listeningInShortList.classList.add('earningManaCoinList');
        listeningInShortList.appendChild(inShortItem1);
        listeningInShortList.appendChild(inShortItem3);

        let songRequestTitle = document.createElement('H3');
        songRequestTitle.innerHTML = 'Making song/feature request(s) :';

        let songRequestText = document.createElement('P');
        songRequestText.innerHTML = "If you notice that some songs you like are missing from any libraries in ManaZeak, or if you found a missing feature that would perfectly fit ManaZeak, you can make a text suggestion, using the bulb icon in the top bar. Just write out the more informations you can about it (title, album, artist etc. for a track - behavior, trigger etc. for a feature). Once sent, you request will be handled in a timely manner (each week). It can be accepted or refused by an administrator, giving you or taking ManaCoins from you to fit the administrator spirit about ManaZeak libraries. It can also be postponned if needed. You then will be notified of what your suggestion has become : generally, if accepted, the song you requested will be dropped into a library and if refused, nothing will happen. For features, you will be rewarded by an administrator with love (and ManaCoin you silly cheap ass) once it has been fully implemented.";

        let songRequestInShortTitle = document.createElement('P');
        songRequestInShortTitle.innerHTML = '<b>In short, making song/feature request(s) :</b>';

        let songRequestInShortList = document.createElement('UL');
        songRequestInShortList.classList.add('earningManaCoinList');
        songRequestInShortList.appendChild(inShortItem1.cloneNode(true));
        songRequestInShortList.appendChild(inShortItem2);
        songRequestInShortList.appendChild(inShortItem3.cloneNode(true));

        let uploadTitle = document.createElement('H3');
        uploadTitle.innerHTML = 'Uploading track(s)/album(s) :';

        let uploadText = document.createElement('P');
        uploadText.innerHTML = "If you notice that some songs you like are missing from any libraries in ManaZeak, you can directly upload the track(s)/album(s) by drag and dropping it anywhere in ManaZeak. You track(s)/album(s) will remain in a buffer folder until a batch is performed (each week). Then, you ill be notified if it has been refused or accepted, and if so, in which library does it belong now. Quality being a ManaZeak holy graal, keep in mind that the more clean is the file(s) you upload, the more ManaCoins you will earn. We make a distinction between 128kbps MP3, 320kbps MP3, OGG and FLAC/WAV. Don't worry, you will never loose ManaCoins uploading a low quality track, you will only earn less than if you made the effort to fetch it in high quality.";

        let uploadInShortTitle = document.createElement('P');
        uploadInShortTitle.innerHTML = '<b>In short, uploading track(s)/album(s) :</b>';

        let uploadInShortList = document.createElement('UL');
        uploadInShortList.classList.add('earningManaCoinList');
        uploadInShortList.appendChild(inShortItem4);
        uploadInShortList.appendChild(inShortItem2.cloneNode(true));
        uploadInShortList.appendChild(inShortItem3.cloneNode(true));

        let editTitle = document.createElement('H3');
        editTitle.innerHTML = 'Editing track(s) metadata :';

        let editText = document.createElement('P');
        editText.innerHTML = "While using ManaZeak, it is possible (... absolutely certain) that you will encounter incorrectly tagged tracks. You can propose a new tag for it using the tag edition modal (right click on the track, \"Edit Tag\"). As for wishes and uploads, your submissions will be reviewed in a timely manner (each week) and depending on the quality of your edit, it will be accepted or refused. Because tagging is life, we strongly encourage you to read the section <b>Tag convention</b> before editing tags, if not you will cause the anger of a psychorigid administrator and will also loose some ManaCoins! At a given rank, tags are automatically accepted. Because they can't be refused at this rank, no loss is possible.";

        let editInShortTitle = document.createElement('P');
        editInShortTitle.innerHTML = '<b>In short, editing track(s) metadata :</b>';

        let editInShortList = document.createElement('UL');
        editInShortList.classList.add('earningManaCoinList');
        editInShortList.appendChild(inShortItem4.cloneNode(true));
        editInShortList.appendChild(inShortItem2.cloneNode(true));
        editInShortList.appendChild(inShortItem3.cloneNode(true));

        let achievementsTitle = document.createElement('H3');
        achievementsTitle.innerHTML = 'Achievements :';

        let achievementsText1 = document.createElement('P');
        achievementsText1.innerHTML = "Finally, you can earn ManaCoin with achievements. They are here just for fun and won't be taken into account to compute your confidence index, so don't bother try harding them to rank up! There is three types of achievements :";

        let achievementsTypesList = document.createElement('UL');
        achievementsTypesList.classList.add('earningManaCoinList');

        let achievementTypesItem1 = document.createElement('LI');
        let achievementTypesItem2 = document.createElement('LI');
        let achievementTypesItem3 = document.createElement('LI');

        achievementTypesItem1.innerHTML = 'one shot ;';
        achievementTypesItem2.innerHTML = 'multi-level ;';
        achievementTypesItem3.innerHTML = 'hidden.';

        achievementsTypesList.appendChild(achievementTypesItem1);
        achievementsTypesList.appendChild(achievementTypesItem2);
        achievementsTypesList.appendChild(achievementTypesItem3);

        let achievementsText2 = document.createElement('P');
        achievementsText2.innerHTML = "You will find them in the scoreboard, with a fulfilling percentage compare to all users. Also, you can buy hints with ManaCoin for hidden achievements. There are three tiers of hints, from cheap to expensive, with more and more detailled informations.";

        let achievementsInShortTitle = document.createElement('P');
        achievementsInShortTitle.innerHTML = '<b>In short, editing track(s) metadata :</b>';

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
        this.ui.menuLibraries.className = "";
        this.ui.menuShortcut.className = "";
        this.ui.menuTagConvention.className = "";
        this.ui.menuRanksPerms.className = "";
        this.ui.menuManaCoin.className = "";
    }

}

export default HelpCenterView