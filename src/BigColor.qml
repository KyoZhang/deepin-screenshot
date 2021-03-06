import QtQuick 2.1

Item {
    id: bigColor
    width: 30
    height: 28
    state: "off"

    property string colorStyle: "#FF1C49"
    signal pressed()
    signal entered()
    signal exited()

    Rectangle {
        id: colorRect
        anchors.centerIn: parent
        width: 16
        height: 16
        radius: 2
        color: bigColor.colorStyle
    }
    Rectangle {
        id: selectArea
        anchors.centerIn: parent
        width: 16
        height: 16
        color: "transparent"
        radius: 2

        border.width: 1
        border.color: Qt.rgba(1, 1, 1, 0.3)
    }

    MouseArea {
        anchors.fill: parent
        hoverEnabled: true

        onEntered: {
            colorRect.border.color = "#01bdff"
            selectArea.border.color = Qt.rgba(1,1,1,0.7)
            bigColor.entered()
        }

        onExited: {
            colorRect.border.color = "transparent"
            selectArea.border.color = Qt.rgba(1,1,1,0.3)
            bigColor.exited()
        }

        onPressed:{
            bigColor.state = bigColor.state == "on" ? "off" : "on"
            selectArea.border.color = Qt.rgba(1,1,1,1)
            bigColor.pressed()
        }
    }

}
