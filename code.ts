// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "create-rectangles") {
    const { selection } = figma.currentPage;
    const frame = figma.createFrame();
    const button = figma.createFrame();
    const nav = figma.createFrame();
    const buttonText = figma.createText();
    const title = figma.createText();
    const paragraph = figma.createText();
    const rectangle = figma.createRectangle();
    const gridFrame = figma.createFrame();
    const secondRect = rectangle.clone();
    const thirdRect = rectangle.clone();

    async function makeButton(node) {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });

      button.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
      button.resize(256, 48);
      button.cornerRadius = 10;
      button.name = "Primary Button";

      buttonText.fontName = { family: "Inter", style: "Bold" };
      buttonText.characters = "Button";
      buttonText.textAutoResize = "WIDTH_AND_HEIGHT";
      buttonText.name = "[Label]";
      buttonText.fontSize = 14;
      buttonText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      button.appendChild(buttonText);

      button.layoutMode = "HORIZONTAL";
      button.primaryAxisSizingMode = "FIXED";
      button.primaryAxisAlignItems = "CENTER";
      button.counterAxisAlignItems = "CENTER";
    }

    makeButton(selection);

    async function makeNav(node) {
      nav.name = "Nav";
      nav.resize(375, 72);
      nav.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    }

    makeNav(selection);

    async function makeTitle(node) {
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      title.fontName = { family: "Inter", style: "Bold" };
      title.characters = "Title";
      title.textAutoResize = "WIDTH_AND_HEIGHT";
      title.name = "[Title]";
      title.fontSize = 24;
      title.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      title.layoutAlign = "STRETCH";
      title.resize(351, 48);
    }

    makeTitle(selection);

    async function makeParagraph(node) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      paragraph.fontName = { family: "Inter", style: "Regular" };
      paragraph.characters =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      paragraph.name = "[Paragraph]";
      paragraph.fontSize = 16;
      paragraph.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      paragraph.layoutAlign = "STRETCH";
      paragraph.resize(351, 1);
      paragraph.layoutGrow = 1;
      paragraph.textAutoResize = "HEIGHT";
    }

    makeParagraph(selection);

    async function makeGrid(node) {
      gridFrame.name = "Grid";
      gridFrame.layoutMode = "HORIZONTAL";
      gridFrame.primaryAxisSizingMode = "AUTO";
      gridFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
      gridFrame.counterAxisAlignItems = "MAX";
      gridFrame.itemSpacing = 16;

      function makeGridItem() {
        rectangle.layoutAlign = "STRETCH";
        rectangle.cornerRadius = 8;
        secondRect.layoutAlign = "STRETCH";
        secondRect.cornerRadius = 8;
        thirdRect.layoutAlign = "STRETCH";
        thirdRect.cornerRadius = 8;
      }

      makeGridItem();

      gridFrame.appendChild(rectangle);
      gridFrame.appendChild(secondRect);
      gridFrame.appendChild(thirdRect);
      gridFrame.clone();
    }

    makeGrid(selection);

    async function makeFrame(node) {
      frame.name = "iPhone Mockup";
      frame.resize(375, 812);
      frame.layoutMode = "VERTICAL";
      frame.primaryAxisSizingMode = "FIXED";
      frame.primaryAxisAlignItems = "SPACE_BETWEEN";
      frame.counterAxisAlignItems = "CENTER";
      frame.paddingBottom = 40;
      frame.itemSpacing = 24;

      frame.appendChild(nav);
      frame.appendChild(title);
      frame.appendChild(paragraph);
      frame.appendChild(gridFrame);
      frame.appendChild(button);
    }

    makeFrame(selection);

    // const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
