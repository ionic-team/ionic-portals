package io.ionic.portals

import android.animation.LayoutTransition
import android.app.Activity
import android.content.Context
import android.graphics.Canvas
import android.os.Build
import android.os.Handler
import android.util.AttributeSet
import android.view.View
import android.view.WindowInsets
import android.widget.FrameLayout
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentTransaction
import java.util.ArrayList

class PortalView : FrameLayout {
    private var mDisappearingFragmentChildren: ArrayList<View>? = null
    private var mTransitioningFragmentViews: ArrayList<View>? = null

    // Used to indicate whether the FragmentContainerView should override the default ViewGroup
    // drawing order.
    private var mDrawDisappearingViewsFirst = true
    private var portalFragment: PortalFragment? = null
    var portalId: String? = null
    var viewId: String? = null
    var tag: String? = null

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        readAttributes(context, attrs)
        loadPortal(context, attrs)
    }

    constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        readAttributes(context, attrs)
        loadPortal(context, attrs)
    }

    fun getPortalFragment(): PortalFragment? {
        return portalFragment
    }

    /**
     * Read attributes defined on the Portal View in the layout.
     *
     * @param context
     * @param attrs
     */
    private fun readAttributes(context: Context, attrs: AttributeSet?) {
        val a = context.obtainStyledAttributes(attrs, R.styleable.PortalView, 0, 0)
        portalId = a.getString(R.styleable.PortalView_portalId)
        viewId = attrs!!.getAttributeValue("http://schemas.android.com/apk/res/android", "id")
        tag = attrs.getAttributeValue("http://schemas.android.com/apk/res/android", "tag")
        a.recycle()
    }

    @Throws(Exception::class)
    private fun loadPortal(context: Context, attrs: AttributeSet) {
        val id = id

        if (PortalManager.size() == 0) {
            throw Exception("Ionic Portals has not been setup with any Portals!")
        }

        if (portalId == null) {
            throw IllegalStateException("Portal views must have a defined portalId")
        }

        portalId?.let {
            val portal: Portal = PortalManager.getPortal(it)

            if (context is Activity) {
                val fm = (context as AppCompatActivity).supportFragmentManager

                if (id <= 0) {
                    throw IllegalStateException("Portals must have an android:id defined")
                }

                val existingFragment = fm.findFragmentById(id)
                var fmTransaction : FragmentTransaction = fm.beginTransaction()
                if (existingFragment != null) {
                    fmTransaction.remove(existingFragment)
                    fmTransaction.commitNowAllowingStateLoss()
                    fmTransaction = fm.beginTransaction()
                }

                portalFragment = fm.fragmentFactory.instantiate(
                    context.getClassLoader(),
                    portal.portalFragmentType.name
                ) as PortalFragment

                portalFragment?.portal = portal
                portalFragment?.onInflate(context, attrs, null)
                val handler = Handler()
                val runnable = Runnable {
                    fmTransaction
                        .setReorderingAllowed(true)
                        .add(id, portalFragment!!, "")
                        .commitNowAllowingStateLoss()
                }

                handler.post(runnable)
            }
        }
    }

    /**
     * When called, this method throws a [UnsupportedOperationException] on APIs above 17.
     * On APIs 17 and below, it calls [FrameLayout.setLayoutTransition]
     * This can be called either explicitly, or implicitly by setting animateLayoutChanges to
     * `true`.
     *
     *
     * View animations and transitions are disabled for FragmentContainerView for APIs above 17.
     * Use [FragmentTransaction.setCustomAnimations] and
     * [FragmentTransaction.setTransition].
     *
     * @param transition The LayoutTransition object that will animated changes in layout. A value
     * of `null` means no transition will run on layout changes.
     * @attr ref android.R.styleable#ViewGroup_animateLayoutChanges
     */
    override fun setLayoutTransition(transition: LayoutTransition?) {
        if (Build.VERSION.SDK_INT < 18) {
            // Transitions on APIs below 18 are using an empty LayoutTransition as a replacement
            // for suppressLayout(true) and null LayoutTransition to then unsuppress it. If the
            // API is below 18, we should allow FrameLayout to handle this call.
            super.setLayoutTransition(transition)
            return
        }
        throw UnsupportedOperationException(
            "FragmentContainerView does not support Layout Transitions or "
                    + "animateLayoutChanges=\"true\"."
        )
    }

    /**
     * {@inheritDoc}
     *
     *
     * The sys ui flags must be set to enable extending the layout into the window insets.
     */
    @RequiresApi(20)
    override fun onApplyWindowInsets(insets: WindowInsets): WindowInsets {
        for (i in 0 until childCount) {
            val child = getChildAt(i)
            // Give child views fresh insets.
            child.dispatchApplyWindowInsets(WindowInsets(insets))
        }
        return insets
    }

    override fun dispatchDraw(canvas: Canvas) {
        if (mDrawDisappearingViewsFirst && mDisappearingFragmentChildren != null) {
            for (i in mDisappearingFragmentChildren!!.indices) {
                super.drawChild(canvas, mDisappearingFragmentChildren!![i], drawingTime)
            }
        }
        super.dispatchDraw(canvas)
    }

    override fun drawChild(canvas: Canvas, child: View, drawingTime: Long): Boolean {
        if (mDrawDisappearingViewsFirst && (mDisappearingFragmentChildren != null
                    ) && (mDisappearingFragmentChildren!!.size > 0)
        ) {
            // If the child is disappearing, we have already drawn it so skip.
            if (mDisappearingFragmentChildren!!.contains(child)) {
                return false
            }
        }
        return super.drawChild(canvas, child, drawingTime)
    }

    override fun startViewTransition(view: View) {
        if (view.parent === this) {
            if (mTransitioningFragmentViews == null) {
                mTransitioningFragmentViews = ArrayList()
            }
            mTransitioningFragmentViews!!.add(view)
        }
        super.startViewTransition(view)
    }

    override fun endViewTransition(view: View) {
        if (mTransitioningFragmentViews != null) {
            mTransitioningFragmentViews!!.remove(view)
            if ((mDisappearingFragmentChildren != null
                        && mDisappearingFragmentChildren!!.remove(view))
            ) {
                mDrawDisappearingViewsFirst = true
            }
        }
        super.endViewTransition(view)
    }

    // Used to indicate the container should change the default drawing order.
    fun setDrawDisappearingViewsLast(drawDisappearingViewsFirst: Boolean) {
        mDrawDisappearingViewsFirst = drawDisappearingViewsFirst
    }

    override fun removeViewAt(index: Int) {
        val view = getChildAt(index)
        addDisappearingFragmentView(view)
        super.removeViewAt(index)
    }

    override fun removeViewInLayout(view: View) {
        addDisappearingFragmentView(view)
        super.removeViewInLayout(view)
    }

    override fun removeView(view: View) {
        addDisappearingFragmentView(view)
        super.removeView(view)
    }

    override fun removeViews(start: Int, count: Int) {
        for (i in start until start + count) {
            val view = getChildAt(i)
            addDisappearingFragmentView(view)
        }
        super.removeViews(start, count)
    }

    override fun removeViewsInLayout(start: Int, count: Int) {
        for (i in start until start + count) {
            val view = getChildAt(i)
            addDisappearingFragmentView(view)
        }
        super.removeViewsInLayout(start, count)
    }

    override fun removeAllViewsInLayout() {
        for (i in childCount - 1 downTo 0) {
            val view = getChildAt(i)
            addDisappearingFragmentView(view)
        }
        super.removeAllViewsInLayout()
    }

    override fun removeDetachedView(child: View, animate: Boolean) {
        if (animate) {
            addDisappearingFragmentView(child)
        }
        super.removeDetachedView(child, animate)
    }

    /**
     * This method adds a [View] to the list of disappearing views only if it meets the
     * proper conditions to be considered a disappearing view.
     *
     * @param v [View] that might be added to list of disappearing views
     */
    private fun addDisappearingFragmentView(v: View) {
        if (mTransitioningFragmentViews != null && mTransitioningFragmentViews!!.contains(v)) {
            if (mDisappearingFragmentChildren == null) {
                mDisappearingFragmentChildren = ArrayList()
            }
            mDisappearingFragmentChildren!!.add(v)
        }
    }
}