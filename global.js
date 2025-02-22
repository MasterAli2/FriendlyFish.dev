
function SetupFooter(id)
{
    const footer = document.getElementById(id)
    if (footer != null)
    {
        footer.innerHTML += `
    <a href="https://github.com/MasterAli2" target="_blank" class="linkcon">
        <img src="https://github.com/fluidicon.png" alt="Github" height="50">
    </a>
    <a href="https://thunderstore.io/c/lethal-company/p/MasterAli2/" target="_blank" class="linkcon">
        <img src="https://thunderstore.io/static/icon.ffafeeaa3ecf.png" alt="Thunderstore" height="50">
    </a>
    `;
    }
    else
    {
        console.log("Could not find footer");

    }

}



function OnPageLoaded()
{
    document.head || (document.head = document.getElementsByTagName('head')[0]);

    //SetIcon
    const IconHref = '/icon.png';
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = IconHref;
    if (oldLink) {
    document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);


    document.head.innerHTML+=`
    <meta property="og:type" content="website">
    <meta property="og:title" content="Friendly Fish">
    <meta property="og:description" content="Silly website I made\n Friendly Fish™">
    <meta property="og:image" content="https://friendlyfish.dev/icon.png">
    `
}

OnPageLoaded()