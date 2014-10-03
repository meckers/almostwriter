package models;

/**
 * Created with IntelliJ IDEA.
 * User: magnus
 * Date: 2014-03-19
 * Time: 11:22
 * To change this template use File | Settings | File Templates.
 */
public class Box {

    private String type;
    private String data;
    private String width;
    private String height;
    private String left;
    private String top;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getLeft() {
        return left;
    }

    public void setLeft(String left) {
        this.left = left;
    }

    public String getTop() {
        return top;
    }

    public void setTop(String top) {
        this.top = top;
    }
}
