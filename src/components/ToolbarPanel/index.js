import React, {forwardRef, useContext} from "react";
import '../../iconfont.css';
import styles from "./index.less";
import { Tooltip } from "antd";
import 'antd/lib/tooltip/style';
import LangContext from "../../util/context";

const ToolbarPanel = forwardRef((props,ref) => {
  const { i18n } = useContext(LangContext);
  return (
    <div className={styles.toolbar} ref={ref}>
      <Tooltip title={i18n['tooltip.undo']}>
                <span className={styles.command} data-command="undo">
                  <span className="iconfont icon-undo" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.redo']}>
                <span className={styles.command} data-command="redo">
                  <span className="iconfont icon-redo" />
                </span>
      </Tooltip>
      <span className={styles.separator} />
      <Tooltip title={i18n['tooltip.copy']}>
                <span className={styles.command} data-command="copy">
                  <span className="iconfont icon-copy-o" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.paste']}>
                <span className={styles.command} data-command="paste">
                  <span className="iconfont icon-paster-o" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.delete']}>
                <span className={styles.command} data-command="delete">
                  <span className="iconfont icon-delete-o" />
                </span>
      </Tooltip>
      <span className={styles.separator} />
      <Tooltip title={i18n['tooltip.zoomIn']}>
                <span className={styles.command} data-command="zoomIn">
                  <span className="iconfont icon-zoom-in-o" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.zoomOut']}>
                <span className={styles.command} data-command="zoomOut">
                  <span className="iconfont icon-zoom-out-o" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.zoomReset']}>
                <span className={styles.command} data-command="resetZoom">
                  <span className="iconfont icon-actual-size-o" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.autoFit']}>
                <span className={styles.command} data-command="autoFit">
                  <span className="iconfont icon-fit" />
                </span>
      </Tooltip>
      <span className={styles.separator} />
      <Tooltip title={i18n['tooltip.toFront']}>
                <span className={styles.command} data-command="toFront">
                  <span className="iconfont icon-to-front" />
                </span>
      </Tooltip>
      <Tooltip title={i18n['tooltip.toBack']}>
                <span className={styles.command} data-command="toBack">
                  <span className="iconfont icon-to-back" />
                </span>
      </Tooltip>
    </div>
  )
});

export default ToolbarPanel;
