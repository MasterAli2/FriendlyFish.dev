
function SetupFooter(id)
{
    const footer = document.getElementById(id)
    if (footer != null)
    {
        footer.innerHTML += `
    <a href="https://github.com/MasterAli2">
        <img src="https://github.com/fluidicon.png" alt="Github" height="50" target="_blank">
    </a>
    <a href="https://thunderstore.io/c/lethal-company/p/MasterAli2/" target="_blank">
        <img src="https://thunderstore.io/static/icon.ffafeeaa3ecf.png" alt="Github" height="50">
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
}

OnPageLoaded()