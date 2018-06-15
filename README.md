# MyPlayer

>
<player down left>
    <link rel="stylesheet" href="player.css">
    <bar></bar>
    <switch onclick="Switch();" class="fa fa-play"></switch>
    <volume onclick="$('block').attr('display', 'show');" class="fa fa-volume-up"></volume>
    <repeat onclick="Repeat();" class="fa fa-repeat"></repeat>
    <link onclick="Link();" class="fa fa-link"></link>
    <play></play>
    <menu onclick="Menu();" class="fa fa-bars"></menu>

    <block display="hide">
        <input type="range" name="trumb" min="0" max="100" step="1" value="10" onchange="SetVolume(this.value)">
        <menu onclick="$('block').attr('display', 'hide');" class="fa fa-times"></menu>
    </block>

    <content type="text" display="hide">
        <input type="url" placeholder="Insert URL" onchange="ChangeURL(this.value)">
        <list>
        </list>
    </content>

    <audio src="http://air.radiorecord.ru:8102/fut_320" type="audio/mpeg"></audio>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="player.js"></script>
</player>
